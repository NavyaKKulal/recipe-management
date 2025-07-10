<?php
session_start();

// Debugging: Check if session data is available
if (!isset($_SESSION['user_id'])) {
    $_SESSION['error_message'] = 'Please log in to access your profile.';
    header('Location: login.php');
    exit();
}

// Include the database connection
include 'db_connection.php';

// Get user ID from session
$user_id = $_SESSION['user_id'];

// Fetch the user details from the database
$query = "SELECT * FROM USER WHERE User_id = ?";
$stmt = $conn->prepare($query);

if ($stmt === false) {
    die('MySQL prepare failed: ' . $conn->error);
}

$stmt->bind_param("i", $user_id);  // Bind the user_id to the query
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
} else {
    // Redirect if user not found or session data is incorrect
    $_SESSION['error_message'] = 'User not found.';
    header('Location: dashboard.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h1 {
            color: #333;
        }
        .profile-picture {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background-color: #ccc;
            margin: 0 auto;
            overflow: hidden;
            position: relative;
        }
        .profile-picture img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .profile-details {
            margin-top: 20px;
        }
        .profile-details p {
            font-size: 18px;
            color: #333;
            margin: 10px 0;
        }
        .profile-details p span {
            font-weight: bold;
        }
        .no-data {
            text-align: center;
            font-size: 18px;
            color: #666;
        }
        .back-button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #333;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }
        .back-button:hover {
            background-color: #555;
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>User Profile</h1>

        <!-- Profile Picture (Placeholder or uploaded picture) -->
        <div class="profile-picture">
            <?php if (isset($user['profile_picture']) && $user['profile_picture'] !== ''): ?>
                <img src="uploads/<?php echo htmlspecialchars($user['profile_picture']); ?>" alt="Profile Picture">
            <?php else: ?>
                <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
                    <span style="font-size: 50px; color: #fff;"><?php echo strtoupper(substr($user['Fname'], 0, 1)); ?></span>
                </div>
            <?php endif; ?>
        </div>

        <!-- User Details -->
        <div class="profile-details">
            <p><span>User ID:</span> <?php echo htmlspecialchars($user['User_id']); ?></p>
            <p><span>First Name:</span> <?= isset($user['Fname']) ? htmlspecialchars($user['Fname']) : 'Not available'; ?></p>
            <p><span>Middle Initial:</span> <?php echo htmlspecialchars($user['Minit']); ?></p>
            <p><span>Last Name:</span> <?php echo htmlspecialchars($user['Lname']); ?></p>
        </div>

        <a href="dashboard.php" class="back-button">Back to Dashboard</a>
    </div>

</body>
</html>
