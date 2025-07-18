function sendTwoSecScreen(screen){

    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;

    if (!validate(username, password1, password2, email)) return;
    
    if (screen == 2){
        document.getElementById("screen1").style.display = "none";
        document.getElementById("screen2").style.display = "block";
        document.getElementById("screen3").style.display = "none";
    }
    if (screen == 3){
        document.getElementById("screen1").style.display = "none";
        document.getElementById("screen2").style.display = "none";
        document.getElementById("screen3").style.display = "block";
    }
}

function erorrScreen(id) {
    document.getElementById(id).focus();
        document.getElementById(id).style.border = "2px solid #E62836";
}

function validate(username, password1, password2, email) 
{
    if (username == ""){
        message("الرجاء إدخال اسم مستخدم");
        erorrScreen("اسم المستخدم");
        return;
    }
    if (email == ""){
        message("الرجاء إدخال بريد إلكتروني");
        erorrScreen("البريد الإلكتروني");
        return;
    }
    if (password1 == ""){
        message("الرجاء إدخال كلمة مرور");
        erorrScreen("كلمة المرور");
        return;
    }
    if (password2 == ""){
        message("الرجاء تأكيد كلمة المرور");
        erorrScreen("تأكيد كلمة المرور");
        return;
    }
    if (password1 != password2){
        message("كلمات المرور غير متطابقة");
        erorrScreen("كلمة المرور");
        return;
    }
    if (password1.length < 8){
        message("يجب أن تكون كلمة المرور على الأقل ٨ أحرف");
        erorrScreen("كلمة المرور");
        return;
    }
    if (password1.length > 20){
        message("يجب أن تكون كلمة المرور أقل من ٢٠ حرفًا");
        erorrScreen("كلمة المرور");
        return;
    }
    if (username.length > 50){
        message("يجب أن يكون اسم المستخدم أقل من ٥٠ حرفًا");
        erorrScreen("اسم المستخدم");
        return;
    }
    if (username == email){
        message("لا يمكن أن يكون اسم المستخدم والبريد الإلكتروني متطابقين");
        erorrScreen("البريد الإلكتروني");
        return;
    }
    if (email.length > 50){
        message("يجب أن يكون البريد الإلكتروني أقل من ٥٠ حرفًا");
        erorrScreen("البريد الإلكتروني");
        return;
    }
    if (email.indexOf("@") == -1){
        message("يجب أن يحتوي البريد الإلكتروني على @");
        erorrScreen("البريد الإلكتروني");
        return;
    }
    if (email.indexOf(".") == -1){
        message("يجب أن يحتوي البريد الإلكتروني على .");
        erorrScreen("البريد الإلكتروني");
        return;
    }
    if (email.indexOf("@") == 0){
        message("يجب أن يحتوي البريد الإلكتروني على اسم مستخدم");
        erorrScreen("البريد الإلكتروني");
        return;
    }
    if (email.indexOf(".") == 0){
        message("يجب أن يحتوي البريد الإلكتروني على نطاق");
        erorrScreen("البريد الإلكتروني");
        return;
    }
    if (email.indexOf("@") == email.length - 1){
        message("يجب أن يحتوي البريد الإلكتروني على نطاق");
        erorrScreen("البريد الإلكتروني");
        return;
    }
    if (email.indexOf(".") == email.length - 1){
        message("يجب أن يحتوي البريد الإلكتروني على نطاق");
        erorrScreen("البريد الإلكتروني");
        return;
    }
    if (email.indexOf("@") != email.lastIndexOf("@")){
        message("يجب أن يحتوي البريد الإلكتروني على @ واحد فقط");
        erorrScreen("البريد الإلكتروني");
        return;
    }
    if (email.indexOf(".") != email.lastIndexOf(".")){
        message("يجب أن يحتوي البريد الإلكتروني على . واحد فقط");
        erorrScreen("البريد الإلكتروني");
        return;
    }
    return true;
}

function selectElsana(button, elsana) {
    // Remove 'selected' class from all buttons
    var buttons = document.querySelectorAll('.elsana-button');
    buttons.forEach(function (btn) {
      btn.classList.remove('elsana-button-selected');
    });

    // Add 'selected' class to the clicked button
    button.classList.add('elsana-button-selected');

    if (elsana == "2"){
        document.getElementById("taqasous-2").style.display = "flex";
        document.getElementById("taqasous-3").style.display = "none";
    } else if (elsana == "3"){
        document.getElementById("taqasous-2").style.display = "none";
        document.getElementById("taqasous-3").style.display = "flex";
    } else {
        document.getElementById("taqasous-2").style.display = "none";
        document.getElementById("taqasous-3").style.display = "none";
    }
}
function selectTaqasous(button, taqasous) {
    // Remove 'selected' class from all buttons
    var buttons = document.querySelectorAll('.taqasous-button');
    buttons.forEach(function (btn) {
      btn.classList.remove('taqasous-button-selected');
    });

    // Add 'selected' class to the clicked button
    button.classList.add('taqasous-button-selected');
}

function message(message){
    document.getElementById("message").innerHTML = message;
    document.getElementById("message").style.display = "block";
    setTimeout(function(){ document.getElementById("message").style.display = "none"; }, 5000);
}

function submitRegistration() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password1 = document.getElementById("password1").value;
    var phone = document.getElementById("phone").value;
    var whatsapp_number = document.getElementById("whatsapp_number").value;
    var parent_phone = document.getElementById("phone-parent").value;
    var birthdate = document.getElementById("dateInput").value;
    var city_id = document.getElementById("city").value;
    var yearBtn = document.querySelector('.elsana-button.elsana-button-selected');
    var current_study_year = yearBtn ? yearBtn.value : '';
    var taqasousBtn = document.querySelector('.taqasous-button.taqasous-button-selected');
    var specialization = taqasousBtn ? taqasousBtn.textContent : '';

    var payload = {
        full_name: username,
        email: email,
        phone: phone,
        whatsapp_number: whatsapp_number,
        parent_phone: parent_phone,
        birthdate: birthdate,
        current_study_year: current_study_year,
        specialization: specialization,
        city_id: parseInt(city_id),
        password: password1
    };

    fetch('http://localhost:3000/api/student/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        if (data.student) {
            message('تم تسجيل الطالب بنجاح!');
            setTimeout(function() {
                window.location.href = 'login.html';
            }, 1500);
        } else {
            message(data.message || 'حدث خطأ أثناء التسجيل');
        }
    })
    .catch(() => {
        message('حدث خطأ في الاتصال بالخادم');
    });
}