<?php

use Stripe\Charge;

function lablaw_ticket_form($form, &$form_state){

    $form['amount'] = array(
        '#type' => 'textfield',
        '#default_value' => 0,
        '#size' => 4,
        '#maxlength' => 5,
        '#attributes' => array(
            'class' => array('numeric-right', 'price-calc'),
        ),
    );
    // Add the stripe form element.
    $form['stripe'] = array(
        '#type' => 'stripe_payment',
        '#address' => TRUE,
        '#prefix' => '',
        '#suffix' => '',
//        '#after_build' => array('basic_cart_stripe_form_after_build'),
    );
    $form['submit'] = array(
        '#type' => 'submit',
        '#id' => 'lablaw_ticket_submit',
        '#value' => t('Continue'),
    );
        // Add custom validation handler.
    $form['#validate'][] = 'lablaw_ticket_form_validate';

    return $form;
}
function lablaw_ticket_form_validate($form, &$form_state) {
    if (stripe_load_library()) {
        try {
            $charge = Charge::create(array(
                    "amount" => $form_state['values']['amount'], // Amount in cents, again
                    "currency" => "usd",
                    "card" => $form_state['values']['stripe']['stripe_token'],
                    "description" => "Test Charge from " . variable_get('site_name', 'My Drupal Site'))
            );
        }
        catch (Exception $e) {
            form_set_error('', $e->getMessage());
            $form_state['rebuild'] = TRUE;
            return;
        }
    }
}
function lablaw_ticket_form_submit($form, &$form_state) {

}
