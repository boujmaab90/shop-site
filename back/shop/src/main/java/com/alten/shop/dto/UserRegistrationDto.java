package com.alten.shop.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRegistrationDto {
    @NotBlank
    private String username;
    @NotBlank
    private String firstname;
    @Email
    private String email;
    @Size(min = 6)
    private String password;

}