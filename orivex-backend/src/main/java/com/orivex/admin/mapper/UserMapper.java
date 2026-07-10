package com.orivex.admin.mapper;

import org.mapstruct.Mapper;

import com.orivex.admin.dto.UserResponse;
import com.orivex.user.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponse toResponse(User user);

}