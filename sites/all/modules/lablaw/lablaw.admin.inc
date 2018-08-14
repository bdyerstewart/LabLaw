<?php

function lablaw_admin_form($form, &$form_state) {
  $form = array();
  $form['lablaw_setup'] = array(
    '#type' => 'fieldset',
    '#title' => t('General Setup'),
  );
  $form['lablaw_setup']['lablaw_bypass_validation'] = array(
    '#type' => 'checkbox',
    '#default_value' => variable_get('lablaw_bypass_validation', FALSE),
    '#title' => t('Bypass validation for administrators to facilitate testing or webforms'),
  );

  $form['lablaw_setup']['lablaw_webform_ids'] = array(
    '#type' => 'textarea',
    '#rows' => 3,
    '#default_value' => variable_get('lablaw_webform_ids', ""),
    '#title' => t('Webform IDs'),
    '#description' => 'Helps other functions attach session variables and js code to specific forms. 
                        <br /> Seperate ids with ",", like "9106,9974,9998" (omit quotations)',
  );
  return system_settings_form($form);
}