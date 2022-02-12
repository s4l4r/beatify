package com.paradise.beatify.web.config.initializer;

import com.paradise.beatify.core.util.constants.BeatifyConstants;
import com.paradise.beatify.web.config.spring.BeatifySpringContext;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.ServletRegistration;

public class BeatifyInitializer implements WebApplicationInitializer {

    @Override
    public void onStartup(javax.servlet.ServletContext servletContext) {

        AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
        context.register(BeatifySpringContext.class);

        servletContext.addListener(new ContextLoaderListener(context));
        context.setServletContext(servletContext);

        ServletRegistration.Dynamic dispatcherServlet = servletContext
                .addServlet(BeatifyConstants.WEB_DISPATCHER_SERVLET_NAME, new DispatcherServlet(context));
        dispatcherServlet.setLoadOnStartup(1);
        dispatcherServlet.addMapping("/");
    }
}
