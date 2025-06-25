export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Adresini Doğrula</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 620px; margin: 0 auto; padding: 15px;">
  <div style="background: #ffffff; padding: 10px 10px; text-align: center; border-bottom: 1px solid #e2e8f0;">
    <!-- Replace YOUR_LOGO_URL with your actual logo URL -->
    <img src="https://www.mertaslanmatematik.com/mert_aslan_logo.png" alt="Company Logo" style="max-width: 200px; height: auto;">
  </div>
  
  <div style="background-color: #ffffff; padding: 30px; margin-top: 20px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <p style="margin-bottom: 15px;">Merhabalar,</p>
    <p style="margin-bottom: 15px;">Kayıt olduğunuz için teşekkür ederiz! Doğrulama kodunuz:</p>
    
    <div style="background: #f7fafc; padding: 20px; margin: 25px 0; border-radius: 6px; border: 1px solid #e2e8f0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 3px; color: #4a5568;">{verificationCode}</span>
    </div>

    <p style="margin-bottom: 15px;">Bu kodu doğrulama sayfasına girin.</p>
    <p style="margin-bottom: 15px;">Üyeliğinizin onaylanmasını bekleyin.</p>
     <p style="margin-bottom: 15px;"> Saygılarımla, <strong style="color: #2d3748;">Mert Aslan</strong>.</p>
    <p style="margin-bottom: 15px; color: #718096;">Güvenlik nedeniyle bu kod 15 dakika içinde geçersiz olacaktır.</p>
    
    <div style="margin-top: 30px; padding-top: 25px; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0; color: #718096;">
        Eğer bu hesabı siz oluşturmadıysanız, bu e-postayı görmezden gelebilirsiniz.</p>
    </div>
  </div>

  <div style="text-align: center; margin-top: 30px; color: #a0aec0; font-size: 0.8em;">
    <p>Bu otomatik bir mesajdır, lütfen bu e-postaya yanıt vermeyin.</p>
  </div>
</body>
</html>
`;

export const STUDENT_INV_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kayıt Linki 🚀🚀</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 620px; margin: 0 auto; padding: 15px;">
  <div style="background: #ffffff; padding: 10px 10px; text-align: center; border-bottom: 1px solid #e2e8f0;">
    <!-- Replace YOUR_LOGO_URL with your actual logo URL -->
    <img src="https://www.mertaslanmatematik.com/mert_aslan_logo.png" alt="Company Logo" style="max-width: 200px; height: auto;">
  </div>
  
  <div style="background-color: #ffffff; padding: 30px; margin-top: 20px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <p style="margin-bottom: 15px;">Merhabalar,</p>
    <p style="margin-bottom: 15px;">Kayıt olduğunuz için teşekkür ederiz!</p>
    <p style="margin-bottom: 15px;">Kaydınızın tamamlanması için aşağıdaki linke tıklayın.</p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Kayıt ol</a>
    </div>

    <p>Bu link güvenlik sebebi ile 1 saat içinde geçersiz olacaktır.</p>
    <p>Saygılarımla,<br>Mert ASLAN</p>
    
    <div style="margin-top: 30px; padding-top: 25px; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0; color: #718096;">
        Eğer bu hesabı siz oluşturmadıysanız, bu e-postayı görmezden gelebilirsiniz.</p>
    </div>
  </div>

  <div style="text-align: center; margin-top: 30px; color: #a0aec0; font-size: 0.8em;">
    <p>Bu otomatik bir mesajdır, lütfen bu e-postaya yanıt vermeyin.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;
