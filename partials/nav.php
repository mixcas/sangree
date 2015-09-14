<nav>
  <!-- Projects -->
<?php
$projects_args = array(
  'post_type' => 'project',
  'posts_per_page' => -1,
  'post_status' => 'publish'
);
$projects_query = new WP_Query( $projects_args );
if( $projects_query->have_posts() ) {
  while( $projects_query->have_posts() ) {
    $projects_query->the_post();
?>

    <span <?php post_class(); ?> id="project-<?php the_ID(); ?>">
      <a class="ajax-link" href="<?php the_permalink() ?>"><?php the_title(); ?></a>
    </span>

<?php
  }
}
?>

  <!-- end Projects -->

  <!-- Pages -->
<?php
$pages_args = array(
  'post_type' => 'page',
  'posts_per_page' => -1,
  'post__not_in' => array(4),
  'post_status' => 'publish',
  'orderby' => 'menu_order'
);
$pages_query = new WP_Query( $pages_args );
if( $pages_query->have_posts() ) {
  while( $pages_query->have_posts() ) {
    $pages_query->the_post();
?>

    <span <?php post_class(); ?> id="page-<?php the_ID(); ?>">
      <a class="ajax-link" href="<?php the_permalink() ?>"><?php the_title(); ?></a>
    </span>

<?php
  }
}
?>

  <!-- end Projects -->
<?php wp_reset_postdata(); ?>
</nav>
