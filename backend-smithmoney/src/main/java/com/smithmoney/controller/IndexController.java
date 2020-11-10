package com.smithmoney.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class IndexController {

	@RequestMapping("/")
	public String index() {
		return "index";
	}
}
