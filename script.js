document.addEventListener("DOMContentLoaded", function () {
    // Get the canvas and its 2D context
    const canvas = document.getElementById("clockCanvas");
    const context = canvas.getContext("2d");

    // Function to draw the clock
    function drawClock() {
        // Calculate the radius of the clock
        const radius = canvas.width / 2;

        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw clock circle with color
        context.beginPath();
        context.arc(radius, radius, radius - 2, 0, 2 * Math.PI);
        context.fillStyle = "#F5F5F5"; // color for the clock shape
        context.fill();
        context.strokeStyle="#000080";
        context.lineWidth = 4;
        context.stroke();

        // Draw clock numbers
        context.font = "20px Arial";
        context.fillStyle = "blue"; // blue color for numbers
        context.textAlign = "center";
        context.textBaseline = "middle";
        for (let i = 1; i <= 12; i++) {
            const angle = (i - 3) * (Math.PI / 6);
            const x = radius + radius * 0.8 * Math.cos(angle);
            const y = radius + radius * 0.8 * Math.sin(angle);
            context.fillText(i, x, y);
        }

        // Get current time
        const now = new Date();
        const hours = now.getHours() % 12;
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const date = now.toDateString();

        // Draw clock hands
        drawHand(hours * 30 + (minutes / 60) * 30, radius - 40, 6, "blue"); // blue color for hour hand
        drawHand(minutes * 6 + (seconds / 60) * 6, radius - 20, 4, "blue"); // blue color for minute hand
        drawHand(seconds * 6, radius - 10, 2, "red"); // red color for second hand

        // Draw clock center
        context.beginPath();
        context.arc(radius, radius, 5, 0, 2 * Math.PI);
        context.fillStyle = "blue"; // blue color for clock center
        context.fill();                

        // Draw date
        context.font = "15px Arial";
        context.fillStyle = "red"; // red color for date
        context.textAlign = "center";
        context.fillText(date, radius, radius + 40); // Move down by 40 pixels

        // Request animation frame
        requestAnimationFrame(drawClock);
    }

    // Function to draw a clock hand
    function drawHand(angle, length, width, color) {
        const radians = (angle - 90) * (Math.PI / 180);
        const x = canvas.width / 2 + length * Math.cos(radians);
        const y = canvas.height / 2 + length * Math.sin(radians);

        // Draw the hand
        context.beginPath();
        context.moveTo(canvas.width / 2, canvas.height / 2);
        context.lineTo(x, y);
        context.strokeStyle = color;
        context.lineWidth = width;
        context.stroke();
    }

    // Initial draw when the DOM is loaded
    drawClock();
});
