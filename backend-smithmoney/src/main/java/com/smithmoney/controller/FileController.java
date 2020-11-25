package com.smithmoney.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;

import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.smithmoney.util.FileUploadUtil;


@CrossOrigin
@RestController
public class FileController {
	
	@PostMapping("/upload")
	public String saveImg(@RequestParam("image") MultipartFile file) {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		String uploadDir = "files";
		
		Date date = new Date();
		String filePrefix = date.getTime() + "-";
		fileName = filePrefix + fileName;
		
		try {
			FileUploadUtil.saveFile(uploadDir, fileName, file);
		} catch (IOException e) {
			return ("Não foi possível salvar o arquivo: " + fileName);
		}
		
		return uploadDir + "/" + fileName;
	}
	
	@GetMapping("/files/{path}")
	public void adminDownloadProductPicture(@PathVariable("path") String path,
	                                        HttpServletResponse response) throws IOException {
	    File file = new File("files/" + path);
	    Files.copy(file.toPath(), response.getOutputStream());
	    response.setContentType("image/jpeg");
	}
}
