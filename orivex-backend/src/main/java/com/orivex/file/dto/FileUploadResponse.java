package com.orivex.file.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileUploadResponse {

    private String fileName;

    private String fileDownloadUri;

    private String fileType;

    private long size;

}