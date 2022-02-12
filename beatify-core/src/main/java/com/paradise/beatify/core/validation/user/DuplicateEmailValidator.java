package com.paradise.beatify.core.validation.user;

import com.paradise.beatify.core.dto.userdetails.UserDTO;
import com.paradise.beatify.core.service.userdetails.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
@Qualifier(value = "emailValidator")
public class DuplicateEmailValidator implements Validator {

    private final UserService userService;

    @Autowired
    public DuplicateEmailValidator(UserService userService) {

        super();
        this.userService = userService;
    }

    @Override
    public boolean supports(Class<?> clazz) {

        return UserDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {

        UserDTO dto = ((UserDTO) target);
        if (userService.existsByUsername(dto))
            errors.rejectValue("username","user.emailisduplicate",
                    "Email Address is Duplicate");
    }
}
