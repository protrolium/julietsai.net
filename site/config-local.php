<?php namespace ProcessWire;

$config->rockdevtools = true;

/** @var Config $config */
$config->debug = true;
$config->advanced = true;
$config->dbHost = 'localhost';
$config->dbName = 'julietsai';
$config->dbUser = 'root';
$config->dbPass = 'root';
$config->dbPort = '3306';
$config->userAuthSalt = '1dd773383683c4dcbc20b0151d563354f85ede26'; 
$config->tableSalt = '1313c84887187f99a67995b0ed3cb6a8e106e21e'; 
$config->httpHosts = array('localhost:8888', 'localhost:8888');

// this prevents logout when switching between
// desktop and mobile in chrome devtools
$config->sessionFingerprint = false;

// RockFrontend
$config->livereload = 1;

// RockMigrations
// $config->filesOnDemand = 'https://your-live.site/';
// $config->rockmigrations = [
//   'syncSnippets' => true,
// ];

// tracy config for ddev development
// $config->tracy = [
//   'outputMode' => 'development',
//   'guestForceDevelopmentLocal' => true,
//   'forceIsLocal' => true,
//   'localRootPath' => '/Users/xyz/code/yourproject/',
//   'numLogEntries' => 100, // for RockMigrations
// ];

// $config->rockpagebuilder = [
//   "createView" => "latte",
// ];