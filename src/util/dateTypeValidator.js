const isDateFormat = (dateString) => {
    // 날짜 형식에 대한 정규식
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
}

export {isDateFormat};