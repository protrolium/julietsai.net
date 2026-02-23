<?php namespace ProcessWire; 

// // retrieve the RSS module
// $rss = $modules->get("MarkupRSS");

// // configure the feed. see the actual module file for more optional config options.
// $rss->title = "RSS Feed";
// $rss->description = "The most recent pages updated on bildwissenschaft.vortok.info";
// //$rss->itemDescriptionField = "body";

// // find the pages you want to appear in the feed
// $items = $pages->find("parent=archive, template=default-page, limit=10, sort=-post_date");

// // Pre-process each page to extract the description
// foreach($items as $item) {
//     // Create a temporary property to hold our extracted content
//     $item->_rssDescription = '';
    
//     if($item->repeater_matrix && $item->repeater_matrix->count) {
//         foreach($item->repeater_matrix as $matrix_item) {
//             if($matrix_item->type == "bodycopy" && isset($matrix_item->body)) {
//                 $item->_rssDescription .= $matrix_item->body . ' ';
//             }
//         }
//     }
// }

// // Set the RSS module to use our custom property
// $rss->itemDescriptionField = '_rssDescription';

// // send the output of the RSS feed, and you are done
// $rss->render($items);

?>