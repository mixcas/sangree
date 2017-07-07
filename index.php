<?php
get_header();
?>

<!-- main content -->

<main id="main-content">

  <!-- main posts loop -->
  <section id="posts">

<?php
if( have_posts() ) {
  while( have_posts() ) {
    the_post();
?>

    <article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

      <a href="#" id="title"><?php the_title(); ?></a>
      <a href="#" id="title-fixed"><?php the_title(); ?></a>

      <?php the_content(); ?>

    </article>

<?php
  }
}
?>
  <!-- end posts -->
  </section>

  <?php get_template_part('partials/pagination'); ?>

<!-- end main-content -->

</main>

<?php
get_footer();
?>
