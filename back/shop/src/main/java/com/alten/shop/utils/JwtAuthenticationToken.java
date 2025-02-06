package com.alten.shop.utils;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import java.util.Collections;

public class JwtAuthenticationToken extends AbstractAuthenticationToken {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private final String email;

    public JwtAuthenticationToken(String email) {
        super(Collections.emptyList());
        this.email = email;
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return email;
    }
}
