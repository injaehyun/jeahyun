document.addEventListener('DOMContentLoaded', () => {
    const lottoNumbersContainer = document.getElementById('lotto-numbers');
    const generateBtn = document.getElementById('generate-btn');
    const zodiacSelect = document.getElementById('zodiac-select');
    const recommendedNumbersContainer = document.getElementById('recommended-numbers');

    generateBtn.addEventListener('click', () => {
        generateLottoNumbers();
    });

    zodiacSelect.addEventListener('change', () => {
        generateRecommendedNumbers(zodiacSelect.value);
    });

    function generateLottoNumbers() {
        lottoNumbersContainer.innerHTML = '';
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        displayNumbers(sortedNumbers, lottoNumbersContainer);
    }

    function generateRecommendedNumbers(zodiac) {
        if (!zodiac) {
            recommendedNumbersContainer.innerHTML = '';
            return;
        }

        const zodiacNumbers = getZodiacNumbers(zodiac);
        const numbers = new Set();
        const zodiacArray = Array.from(zodiacNumbers);

        while (numbers.size < 6) {
            // Get a random index from the zodiacArray
            const randomIndex = Math.floor(Math.random() * zodiacArray.length);
            numbers.add(zodiacArray[randomIndex]);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
        displayNumbers(sortedNumbers, recommendedNumbersContainer);
    }

    function displayNumbers(numbers, container) {
        container.innerHTML = '';
        numbers.forEach(number => {
            const numberElement = document.createElement('div');
            numberElement.className = 'lotto-number';
            numberElement.textContent = number;
            numberElement.style.backgroundColor = getNumberColor(number);
            container.appendChild(numberElement);
        });
    }

    function getZodiacNumbers(zodiac) {
        // Just for fun, not based on any real data.
        const zodiacData = {
            rat: [1, 5, 10, 15, 22, 33, 44],
            ox: [2, 6, 11, 16, 23, 34, 45],
            tiger: [3, 7, 12, 17, 24, 35, 43],
            rabbit: [4, 8, 13, 18, 25, 36, 42],
            dragon: [5, 9, 14, 19, 26, 37, 41],
            snake: [6, 10, 15, 20, 27, 38, 40],
            horse: [7, 11, 16, 21, 28, 39, 39],
            sheep: [8, 12, 17, 22, 29, 38, 37],
            monkey: [9, 13, 18, 23, 30, 36, 35],
            rooster: [10, 14, 19, 24, 31, 34, 33],
            dog: [11, 15, 20, 25, 32, 32, 31],
            pig: [12, 16, 21, 26, 33, 30, 29]
        };
        return new Set(zodiacData[zodiac] || []);
    }

    function getNumberColor(number) {
        if (number <= 10) return '#fbc400'; // Yellow
        if (number <= 20) return '#69c8f2'; // Blue
        if (number <= 30) return '#ff7272'; // Red
        if (number <= 40) return '#aaa';    // Gray
        return '#b0d840';           // Green
    }
});