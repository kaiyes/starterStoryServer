export default function htmlEmail(passCode) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bundai</title>
    
   
</head>
<body style="background-color: #363f55; 
     
    padding-left: 30px;
    width: auto;
    font-family: Arial, Helvetica, sans-serif; 
    font-weight: 400;
    padding-top: 40px;
    padding-bottom: 40px;"
    
>
    <p style="margin-bottom:25px ;color: grey;">Bundai Verify your PRO account!</p>
    <p style="color: grey;">Hi,</p>
    <p style=" margin-top: 25px;color: grey; ">We here at Bundai are excited to welcome you to your account.</p>
    <p style="margin-top: 25px;color: grey;">Please use the code below to verify your account via the app:</p>
    <p style="color: gold; font-weight: bold; font-size: 23px; ">${passCode}</p>
    <div style="font-weight: 500;
    margin-top: 33px;
    list-style: none;">
        <li style="margin-bottom: 8px; color: red;font-weight: bold;">PRO BENIFITS</li>
        <li style="margin-bottom: 2.5px;color: grey;"> Unlimited Free Quiz</li>
    </div>
    
    <p style="margin-top: 50px;margin-bottom:35px;color: grey;">Enjoy! Drop us a line if you have any  questions.</p>
    <div style="line-height: 3px;font-weight:500;">
        <p style="color: grey;">Sincerely, </p>
        <p style="color: grey;">Bundai Team</p>
    </div>
    <div style="margin-top: 35px;
    display: flex;
    align-items: center;">
      </div>
    <div style="font-size: 12.5px;line-height: 4px;">
        <p style="line-height: normal;color: grey;">
          Bundai is a japanese language learning app  
        </p>
        <p style="color: grey;">
            Download the App for <a style=" color: gray; font-weight: bold;" target="_blank" href="">iOS</a> and <a style="font-weight: bold; color: gray;" target="_blank" href=""> Android</a>
        </p>
        <p style="color: gray;font-weight: bold;">Bundai</p>
    </div>
   
    
</body>
</html>`;
}
