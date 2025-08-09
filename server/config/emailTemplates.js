export const PASSWIRD_RESET_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>PelagoPass</title>
  <style>
    /* Reset styles */
    body, table, td, p, a { margin:0; padding:0; text-decoration:none; border:none; }
    img { border:0; outline:none; display:block; }
    body { background-color:#F6F6F6; font-family:Arial, Helvetica, sans-serif; color:#333333; }
    /* Responsive */
    @media only screen and (max-width: 600px) {
      .container { width:100% !important; padding:0 15px !important; }
      h1 { font-size:24px !important; }
      p { font-size:14px !important; }
    }
  </style>
</head>
<body>
  <table width="100%" bgcolor="#F6F6F6" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center">

        <!-- Header -->
        <table class="container" width="600" bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" style="max-width:600px;">
          <tr>
            <td align="center" style="padding:20px;">
              <img src="https://fvojodu.stripocdn.email/content/guids/CABINET_a48d776efb453d658a9877246973fcd81338741dfc1f4a3956749c762ecb5ac7/images/pelagofavicon.png"
                   alt="Pelago Icon"
                   width="25" height="25"
                   style="width:25px !important; height:25px !important;">
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <p style="font-size:20px; font-weight:bold; margin:0;">PelagoPass</p>
            </td>
          </tr>
        </table>

        <!-- Content -->
        <table class="container" width="600" bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" style="max-width:600px;">
          <tr>
            <td align="center" style="padding:20px;">
              <h1 style="font-size:28px; margin-bottom:15px;">Reset Password</h1>
              <p style="font-size:14px; margin-bottom:10px;">Hello, <strong>{{name}}</strong></p>
              <p style="font-size:14px; margin-bottom:10px;">
                Your one time OTP code is: <strong>{{otp}}</strong>.
              </p>
              <p style="font-size:14px; font-style:italic; margin-bottom:20px;">
                Did not request a password change? Contact support immediately.
              </p>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table class="container" width="600" bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" style="max-width:600px; margin-top:20px;">
          <tr>
            <td align="center" style="padding:15px;">
              <p style="font-size:12px; color:#777;">
                © {{year}} PelagoPass. All rights reserved.
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`

export const EMAIL_VERIFY_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>PelagoPass</title>
  <style>
    /* Reset styles */
    body, table, td, p, a { margin:0; padding:0; text-decoration:none; border:none; }
    img { border:0; outline:none; display:block; }
    body { background-color:#F6F6F6; font-family:Arial, Helvetica, sans-serif; color:#333333; }
    /* Responsive */
    @media only screen and (max-width: 600px) {
      .container { width:100% !important; padding:0 15px !important; }
      h1 { font-size:24px !important; }
      p { font-size:14px !important; }
    }
  </style>
</head>
<body>
  <table width="100%" bgcolor="#F6F6F6" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center">

        <!-- Header -->
        <table class="container" width="600" bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" style="max-width:600px;">
          <tr>
            <td align="center" style="padding:20px;">
              <img src="https://fvojodu.stripocdn.email/content/guids/CABINET_a48d776efb453d658a9877246973fcd81338741dfc1f4a3956749c762ecb5ac7/images/pelagofavicon.png"
                   alt="Pelago Icon"
                   width="25" height="25"
                   style="width:25px !important; height:25px !important;">
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <p style="font-size:20px; font-weight:bold; margin:0;">PelagoPass</p>
            </td>
          </tr>
        </table>

        <!-- Content -->
        <table class="container" width="600" bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" style="max-width:600px;">
          <tr>
            <td align="center" style="padding:20px;">
              <h1 style="font-size:28px; margin-bottom:15px;">Email Verification</h1>
              <p style="font-size:14px; margin-bottom:10px;">Hello, <strong>{{name}}</strong></p>
              <p style="font-size:14px; margin-bottom:10px;">
                Your one time OTP code is: <strong>{{otp}}</strong>.
              </p>
              <p style="font-size:14px; font-style:italic; margin-bottom:20px;">
                If you did not request this, change your password immediately. 
              </p>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table class="container" width="600" bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" style="max-width:600px; margin-top:20px;">
          <tr>
            <td align="center" style="padding:15px;">
              <p style="font-size:12px; color:#777;">
                © {{year}} PelagoPass. All rights reserved.
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`

export const REGISTER_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Welcome to PelagoPass</title>
  <style>
    /* Reset styles */
    body, table, td, p, a { margin:0; padding:0; text-decoration:none; border:none; }
    img { border:0; outline:none; display:block; }
    body { background-color:#F6F6F6; font-family:Arial, Helvetica, sans-serif; color:#333333; }
    /* Responsive */
    @media only screen and (max-width: 600px) {
      .container { width:100% !important; padding:0 15px !important; }
      h1 { font-size:24px !important; }
      p { font-size:14px !important; }
    }
  </style>
</head>
<body>
  <table width="100%" bgcolor="#F6F6F6" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center">

        <!-- Header -->
        <table class="container" width="600" bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" style="max-width:600px;">
          <tr>
            <td align="center" style="padding:20px;">
              <img src="https://fvojodu.stripocdn.email/content/guids/CABINET_a48d776efb453d658a9877246973fcd81338741dfc1f4a3956749c762ecb5ac7/images/pelagofavicon.png"
                   alt="Pelago Icon"
                   width="25" height="25"
                   style="width:25px !important; height:25px !important;">
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <p style="font-size:20px; font-weight:bold; margin:0;">PelagoPass</p>
            </td>
          </tr>
        </table>

        <!-- Content -->
        <table class="container" width="600" bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" style="max-width:600px;">
          <tr>
            <td align="center" style="padding:20px;">
              <h1 style="font-size:28px; margin-bottom:15px;">Welcome to PelagoPass</h1>
              <p style="font-size:14px; margin-bottom:10px;">Hello, <strong>{{user}}</strong></p>
              <p style="font-size:14px; margin-bottom:10px;">
                Your account has been created with the email: <strong>{{email}}</strong>.
              </p>
              <p style="font-size:14px; font-style:italic; margin-bottom:20px;">
                Make sure to verify your account to get access to all basic features.
              </p>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table class="container" width="600" bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" style="max-width:600px; margin-top:20px;">
          <tr>
            <td align="center" style="padding:15px;">
              <p style="font-size:12px; color:#777;">
                © {{year}} PelagoPass. All rights reserved.
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`