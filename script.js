document.getElementById('password-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const passwordStrengthElement = document.getElementById('password-strength');

    if (password.length === 0) {
        // 비밀번호가 없을 경우 경고
        Swal.fire({
            title: '경고!',
            text: '비밀번호를 입력하세요.',
            icon: 'warning',
            confirmButtonText: '확인'
        });
        return;
    }

    const strength = checkPasswordStrength(password);
    displayPasswordStrength(strength, passwordStrengthElement);
});

function checkPasswordStrength(password) {
    const strength = {
        score: 0,
        feedback: ''
    };

    // 비밀번호 길이가 8자 이상이면 1점 추가
    if (password.length >= 8) strength.score++;

    // 대문자, 소문자, 숫자, 특수문자가 포함되면 점수 추가
    if (/[a-z]/.test(password)) strength.score++;
    if (/[A-Z]/.test(password)) strength.score++;
    if (/\d/.test(password)) strength.score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength.score++;

    // 강도에 따른 메시지 설정
    if (strength.score === 4) {
        strength.feedback = '강력한 비밀번호입니다!';
    } else if (strength.score === 3) {
        strength.feedback = '좋은 비밀번호입니다!';
    } else if (strength.score === 2) {
        strength.feedback = '비밀번호가 약합니다.';
    } else {
        strength.feedback = '비밀번호가 너무 약합니다.';
    }

    return strength;
}

function displayPasswordStrength(strength, element) {
    element.innerHTML = `<p class="font-semibold text-xl ${strength.score === 4 ? 'text-green-600' : strength.score === 3 ? 'text-yellow-500' : 'text-red-500'}">${strength.feedback}</p>`;

    // SweetAlert2를 사용하여 강도 결과를 팝업으로 표시
    Swal.fire({
        title: '비밀번호 강도',
        text: strength.feedback,
        icon: strength.score === 4 ? 'success' : strength.score === 3 ? 'warning' : 'error',
        confirmButtonText: '확인'
    });
}
