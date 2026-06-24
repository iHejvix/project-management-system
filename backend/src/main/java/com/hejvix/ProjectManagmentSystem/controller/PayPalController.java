//package com.hejvix.ProjectManagmentSystem.controller;
//
//import com.hejvix.ProjectManagmentSystem.modal.PlanType;
//import com.hejvix.ProjectManagmentSystem.modal.User;
//import com.hejvix.ProjectManagmentSystem.service.UserService;
//import com.paypal.core.PayPalHttpClient;
//import com.paypal.orders.*;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Collections;
//
//@RestController
//@RequestMapping("/api/payments")
//public class PayPalController {
//    private final PayPalHttpClient payPalClient;
//    private final UserService userService;
//
//    public PayPalController(PayPalHttpClient payPalClient, UserService userService) {
//        this.payPalClient = payPalClient;
//        this.userService = userService;
//        //1. payments with 3 you make 1
//        //2. Testing with yt on Postman and testing PayPal transactions
//    }
//
//    @Value("${paypal.returnUrl}")
//    private String returnUrl;
//
//    @Value("${paypal.cancelUrl}")
//    private String cancelUrl;
//
//    @PostMapping("/{planType}")
//    public ResponseEntity<String> createOrder(
//            @PathVariable PlanType planType,
//            @RequestHeader("Authorization") String jwt
//    ) throws Exception {
//        OrdersCreateRequest request = new OrdersCreateRequest();
//        request.requestBody(buildRequestBody(planType, userService.findUserByJwt(jwt)));
//
//        try {
//            Order order = payPalClient.execute(request).result();
//            return ResponseEntity.ok(order.id());
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    private OrderRequest buildRequestBody(PlanType planType, User user) {
//        OrderRequest orderRequest = new OrderRequest();
//        orderRequest.checkoutPaymentIntent("CAPTURE");
//
//        int amount = 100;
//        if (planType.equals(PlanType.ANNUALLY)) {
//            amount = (int) (amount * 12 * 0.7);
//        }
//
//        ApplicationContext applicationContext = new ApplicationContext().userAction(user.getEmail())
//                .landingPage("BILLING").cancelUrl(cancelUrl).returnUrl(returnUrl + planType); //FIXME cancelUrl may be wrong
//
//        AmountWithBreakdown amountWithBreakdown = new AmountWithBreakdown().currencyCode("USD")
//                .value(String.valueOf(amount));
//
//        orderRequest.applicationContext(applicationContext);
//        orderRequest.purchaseUnits(Collections.singletonList(new PurchaseUnitRequest()
//                .amountWithBreakdown(amountWithBreakdown)));
//
//        return orderRequest;
//    }
//}
