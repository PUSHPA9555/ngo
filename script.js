document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('donationForm');
    const amountInput = document.getElementById('donationAmount');
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const mobileInput = document.getElementById('mobileInput');
    const messageInput = document.getElementById('messageInput');
    const selectInput = document.getElementById('selectInput');

    const qrSection = document.getElementById('qrSection');
    const qrImg = document.getElementById('qrImg');
    const qrAmountText = document.getElementById('qrAmountText');
    const donationTable = document.getElementById('donationDataTable');

    let donationData = JSON.parse(localStorage.getItem("donationData")) || [];

    function renderDonationData() {
        if (!donationTable) return;

        if (donationData.length === 0) {
            donationTable.innerHTML = "<p class='text-center text-muted'>No donations yet.</p>";
            return;
        }

        let html = `
            <table class="table table-bordered table-striped mt-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
        `;

        donationData.forEach(d => {
            html += `
                <tr>
                    <td>${d.name}</td>
                    <td>${d.email}</td>
                    <td>${d.phone}</td>
                    <td>${d.category}</td>
                    <td>₹${d.amount}</td>
                    <td>${d.message}</td>
                </tr>
            `;
        });

        html += `</tbody></table>`;
        donationTable.innerHTML = html;
    }

    // Initial render if data exists
    renderDonationData();

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const amount = parseFloat(amountInput.value);
            if (isNaN(amount) || amount < 1) {
                alert("Please enter a valid donation amount of ₹1 or more.");
                qrSection.style.display = 'none';
                return;
            }

            // Generate QR Code
            const upiId = "yadavpushpraj758@okaxis";
            const payeeName = "Yadav Foundation";
            const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR`;
            const qrApi = "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" + encodeURIComponent(upiUrl);

            qrImg.src = qrApi;
            qrSection.style.display = 'block';
            qrAmountText.innerText = "Donation Amount: ₹" + amount;
            qrSection.scrollIntoView({ behavior: 'smooth' });

            // Save donation data
            const newDonation = {
                name: nameInput.value,
                email: emailInput.value,
                phone: mobileInput.value,
                category: selectInput.value,
                amount: amountInput.value,
                message: messageInput.value
            };

            donationData.push(newDonation);
            localStorage.setItem("donationData", JSON.stringify(donationData));

            renderDonationData(); // Re-render table
            form.reset(); // Reset form
        });
    }
});


// const model = document.getElementById("myModel");

const form = document.getElementById("dataForm");

const emailInput = document.getElementById("emailInput");
const password = document.getElementById("passwordInput");

// ?show data?

const users = document.getElementById("users")



// Form submit redirect to dashboard

form.onsubmit = (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    if (email == "mp04042007@gmail.com" && password == 2026) {

        Swal.fire({
            icon: 'success',
            title: 'Login Completed',
            text: 'Welcome to Login Page',
            timer: 1500,
            showConfirmation: false
        }).then(() => {
            window.location.href = 'dashboard.html'
        })

    }
    else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "please enter valid id or password",
            footer: ' <a href="admin.html">Try again?</a> '
        });
    }
};








