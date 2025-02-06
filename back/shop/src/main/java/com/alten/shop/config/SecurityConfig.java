
package com.alten.shop.config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

import com.alten.shop.utils.JwtUtil;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	@Autowired
	private JwtUtil jwtUtil;
	
    @Autowired
    private UserDetailsService userDetailsService;

	// Configuration principale
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http, MvcRequestMatcher.Builder mvc) throws Exception {
		http.userDetailsService(userDetailsService) // Injection du bean userDetail
			.cors(Customizer.withDefaults()) // sactive CROS
			.csrf(csrf -> csrf.disable()) // Désactive CSRF
			.authorizeHttpRequests(auth -> auth.requestMatchers(mvc.pattern("/account")).permitAll() // Route publique
												.requestMatchers(mvc.pattern("/token")).permitAll() // Route publique
				.requestMatchers(mvc.pattern("/products/**")).hasAuthority("admin@admin.com") // Vérification admin
				.anyRequest().authenticated()) // Toutes les autres routes nécessitent une authentification
			.addFilterBefore(new JwtFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class); // Ajoute le filtre JWT

		return http.build();
	}

	// Bean pour l'encodeur de mot de passe
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	// Bean pour l'authentification (nécessaire pour Spring Security 6+)
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

	// Bean pour indiquer le pattern d'un URL (permet de corriger l'erreur The Method Cannot Decide Whether These Patterns are MVC Patterns or Not)
	@Bean
	MvcRequestMatcher.Builder mvc(HandlerMappingIntrospector introspector) {
		return new MvcRequestMatcher.Builder(introspector);
	}
	
	// Bean pour gèrer le blocage CROS
	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:4200")
                        .allowedMethods("*")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
