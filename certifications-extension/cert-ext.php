<?php
/**
 * Plugin Name: Certificate Extension
 * Plugin URI:
 * Description: Adds functionality to Training Site to support certification program
 * Version: 0.5
 * Author: Sean Smith
 * Author URI: http://despace.design
 */



function cert_ext_style() {
  /* Enqueue Style Sheets */
   wp_enqueue_style( 'cert-ext-style', plugin_dir_url( __FILE__ ) . '/css/cert-ext.css', array(), '0.1', 'screen' );
}


function cert_ext_enqueue_script() {
  wp_enqueue_script( 'cert_ext_enqueue_script', plugin_dir_url( __FILE__ ) . 'js/cert-ext.js', false, false, true );
}
add_action('wp_enqueue_scripts', 'cert_ext_enqueue_script');


add_action("wp_footer", "cert_ext_enqueue_script");


add_action( 'wp_enqueue_scripts', 'cert_ext_style' );



