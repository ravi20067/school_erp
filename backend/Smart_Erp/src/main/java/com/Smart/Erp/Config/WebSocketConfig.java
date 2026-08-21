package com.Smart.Erp.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${test.url}")
    private String url;
    /**
     * Client Connection Endpoint
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {

        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns(
                        "http://localhost",
                        "https://localhost",
                        "http://localhost:80",
                        "https://localhost:80",
                        "http://localhost:8080",
                        "https://localhost:8080",
                        "http://172.30.112.1",
                        "https://172.30.112.1",
                        "http://172.30.112.1:8080",
                        "https://172.30.112.1:8080",
                        "https://shortcut-sled-multiply.ngrok-free.dev",
                        "https://*.duckdns.org",
                        "https://*.trycloudflare.com",
                        url
                )
                .withSockJS();

    }

    /**
     * STOMP Configuration
     */
    @Override
    public void configureMessageBroker(
            MessageBrokerRegistry registry
    ) {

        /*
         * Client Subscription
         *
         * /topic/attendance/15
         */
        registry.enableSimpleBroker("/topic");

        /*
         * Client Send
         *
         * /app/...
         */
        registry.setApplicationDestinationPrefixes("/app");

    }

}