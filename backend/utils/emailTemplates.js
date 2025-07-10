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
    <img src="https://www.mertaslanmatematik.com/logo/mert_aslan_logo.png" alt="Company Logo" style="max-width: 200px; height: auto;">
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
    <p>Merhaba,</p>
<p>Şifrenizin başarıyla sıfırlandığını onaylamak için yazıyoruz.</p>
<div style="text-align: center; margin: 30px 0;">
<div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
✓
</div>
</div>
<p>Bu şifre sıfırlama işlemini siz başlatmadıysanız, lütfen hemen destek ekibimizle iletişime geçin.</p>
<p>Güvenlik nedeniyle şunları yapmanızı öneririz:</p>
<ul>
<li>Güçlü ve benzersiz bir şifre kullanın</li>
<li>Mümkünse iki faktörlü kimlik doğrulamayı etkinleştirin</li>
<li>Birden fazla sitede aynı şifreyi kullanmaktan kaçının</li>
</ul>
<p>Teşekkür ederiz Hesabınızın güvenliğini sağlamamıza yardımcı olduğunuz için teşekkür ederiz.</p>
<p>Saygılarımızla,<br>Uygulama Ekibiniz</p>
</div>
<div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
<p>Bu otomatik bir mesajdır, lütfen bu e-postaya yanıt vermeyin.</p>
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
  <title>Parolanı Güncelle</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Merhaba,</p>
    <p>Şifrenizi sıfırlamamız için bir istek aldık. Bu isteği siz yapmadıysanız, lütfen bu e-postayı dikkate almayın.</p>
    <p>Şifrenizi sıfırlamak için aşağıdaki butona tıklayın:</p>
<div style="text-align: center; margin: 30px 0;">
<a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Şifreyi Sıfırla</a>
</div>
<p>Güvenlik nedeniyle bu bağlantı 1 saat içinde sona erecektir.</p>
<p>Saygılarımızla,<br>Uygulama Ekibiniz</p>
</div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>Bu bir otomatik mesajdır, lütfen yanıtlamayınız.</p>
  </div>
</body>
</html>
`;
