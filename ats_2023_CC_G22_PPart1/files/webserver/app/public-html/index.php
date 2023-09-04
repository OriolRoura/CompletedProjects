<!DOCTYPE html>
<html>
  <?php
  $host = gethostname();
  echo "WebServer ID: ";
  echo $host;
  echo "\n";

  # Configure connexion
  $conn = pg_connect("host=Database port=5432 dbname=WebAppDB user=webapp password=securewebapp12345");

  # Check connexion
  if (!$conn) {
    echo "An error occurred.\n";
    exit;
  }

  # Prepare insert query
  $query = "INSERT INTO WebAppRequests(webserver) VALUES ('{$host}');";

  # Run insert query
  pg_query($query);
  # pg_query(commit());

  # Run read query
  $result = pg_query("SELECT COUNT(*) FROM WebAppRequests");
  if (!$result) {
    echo "An error occurred.\n";
    exit;
  }

  # Show results
  while ($row = pg_fetch_row($result)) {
    echo "Num served requests: $row[0]";
    echo "<br />\n";
  }
  ?>
</html>