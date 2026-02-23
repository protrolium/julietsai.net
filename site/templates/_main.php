<?php namespace ProcessWire;

// Optional main output file, called after rendering page’s template file. 
// This is defined by $config->appendTemplateFile in /site/config.php, and
// is typically used to define and output markup common among most pages.
// 	
// When the Markup Regions feature is used, template files can prepend, append,
// replace or delete any element defined here that has an "id" attribute. 
// https://processwire.com/docs/front-end/output/markup-regions/
	
/** @var Page $page */
/** @var Pages $pages */
/** @var Config $config */
/** @var RockFrontend $rockfrontend */

$home = $pages->get('/'); // homepage directory

?>
<!DOCTYPE html>
<html lang="en">
	<head id="html-head">

		<style>
			/* Prevent FOUC by hiding content until styles are loaded */
			html {visibility: hidden;opacity: 0; transition: opacity 0.2s ease;}
			body.preload * {transition: none !important;animation: none !important;}
			body.preload .page-content {opacity: 0;visibility: hidden;}
		</style>

		<meta http-equiv="content-type" content="text/html; charset=utf-8" />

		<!-- add our styles and scripts -->
		<?= $rockfrontend->styleTag($config->urls->templates . "dst/styles.min.css") ?>
		<?= $rockfrontend->scriptTag($config->urls->templates . "dst/scripts.min.js") ?>
		
		<!-- load FormBuilder styles -->
		<?php if (!empty($formStyles)): ?><?= $formStyles ?><?php endif; ?>
		
		<!-- make sure we get styling on mobile by setting meta viewport -->
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title><?php echo ($page->name == 'home' ? $page->title : $page->title . ' — ' . $home->title); ?></title>
		<!-- <meta name="description" content=""> -->
		<meta name="keywords" content="">
		<meta name="generator" content="ProcessWire">

		<!-- fonts -->
		<!-- <link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="" rel="stylesheet">  -->

		<!-- favicons -->
		<!-- <link rel="apple-touch-icon" sizes="180x180" href="<?php echo $config->urls->assets?>favicon/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="<?php echo $config->urls->assets?>favicon/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="<?php echo $config->urls->assets?>favicon/favicon-16x16.png">
		<link rel="manifest" href="<?php echo $config->urls->assets?>favicon/site.webmanifest">
		<link rel="mask-icon" href="<?php echo $config->urls->assets?>favicon/safari-pinned-tab.svg" color="#5bbad5">
		<meta name="msapplication-TileColor" content="#da532c">
		<meta name="theme-color" content="#ffffff"> -->

		<!-- metatags -->
		<?php $metadata = $modules->get('MarkupMetadata');?>
		<?php echo $metadata->render();?>

	</head>
	<!-- add template name to body for onload.js to exclude blog posts -->
	<body id="html-body" class="template-<?= $page->template->name ?>">

		<div class="cursor-gradient-blob" aria-hidden="true"></div>

		<!-- make sure we are in dark mode -->
		<!-- if the default is dark mode, assign it in main.js -->
		<script type="text/javascript">
			const selectedTheme = localStorage.getItem('dark-mode');
			if (selectedTheme === "enabled") {
				html.dataset.theme = `theme-dark`;
			} else if (selectedTheme === "disabled") {
				html.dataset.theme = `theme-light`;
			};
		</script>
		
		<div class="site-content">
			<?= $rockfrontend->render("sections/includes/header.latte") ?>
			<?= $rockfrontend->renderLayout($page) ?>
			<?= $rockfrontend->render("sections/includes/footer.latte") ?>
		</div>

		<!-- show our site content after everything is loaded -->
		<script type="text/javascript">
			// Ensure content is only shown after all resources are loaded
			window.addEventListener('load', function () {
				document.body.classList.remove('preload');
				// Small delay to ensure all styles are applied
				setTimeout(function() {
					document.documentElement.style.visibility = 'visible';
					document.documentElement.style.opacity = '1';
				}, 50);
			});
		</script>

		<!-- load FormBuilder scripts -->
		<?php if (!empty($formScripts)): ?><?= $formScripts ?><?php endif; ?>
		<!-- scripts for once DOM is loaded -->
		<script type="text/javascript" src="<?php echo $config->urls->templates?>scripts/onload.js" defer></script>
		<!-- mastodon verification -->
		<!-- <a class="noExternalSVG" rel="me" href="" style="display:hidden;" aria-label="Mastodon Verification"></a> -->
	</body>
</html>