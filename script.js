/**
 * ResumeMint - Logic for Resume Builder
 */

document.addEventListener('DOMContentLoaded', () => {
    // State
    let currentTemplate = 'classic';
    let isPremium = false;

    // Elements
    const landingSection = document.getElementById('landing');
    const builderSection = document.getElementById('builder');
    const resumePreview = document.getElementById('resume-preview');
    const createBtn = document.getElementById('create-btn');
    const downloadBtn = document.getElementById('downloadBtn');
    const templateOptions = document.querySelectorAll('.template-option');
    const upgradeBtn = document.getElementById('upgrade-btn');

    // Form Inputs
    const inputs = {
        fullName: document.getElementById('fullName'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        address: document.getElementById('address'),
        objective: document.getElementById('objective'),
        education: document.getElementById('education'),
        skills: document.getElementById('skills'),
        experience: document.getElementById('experience'),
        projects: document.getElementById('projects'),
        links: document.getElementById('links')
    };

    // Initialize
    const init = () => {
        // Show builder on click
        createBtn.addEventListener('click', () => {
            landingSection.style.display = 'none';
            builderSection.style.display = 'block';
            window.scrollTo(0, 0);
            updatePreview();
        });

        // Add input listeners for real-time preview
        Object.values(inputs).forEach(input => {
            input.addEventListener('input', updatePreview);
        });

        // Template switching
        templateOptions.forEach(option => {
            option.addEventListener('click', () => {
                templateOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                currentTemplate = option.dataset.template;
                updatePreview();
            });
        });

        // Download PDF using jsPDF
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function () {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();

                const resumeContent = document.getElementById("resume-preview");

                // Visual feedback
                const originalText = downloadBtn.innerText;
                downloadBtn.innerText = "Generating PDF...";
                downloadBtn.disabled = true;

                doc.html(resumeContent, {
                    callback: function (doc) {
                        doc.save("ResumeMint_Resume.pdf");
                        downloadBtn.innerText = originalText;
                        downloadBtn.disabled = false;
                    },
                    x: 10,
                    y: 10,
                    width: 180,
                    windowWidth: 800
                });
            });
        }

        // Mock Upgrade
        upgradeBtn.addEventListener('click', () => {
            alert("Redirecting to secure payment gateway (Mock)...");
            setTimeout(() => {
                isPremium = true;
                alert("Payment Successful! Premium features unlocked.");
                updatePreview();
            }, 1500);
        });
    };

    // Update Preview Logic
    const updatePreview = () => {
        const data = {
            fullName: inputs.fullName.value || 'Your Full Name',
            email: inputs.email.value || 'email@example.com',
            phone: inputs.phone.value || '+1 234 567 890',
            address: inputs.address.value || 'City, Country',
            objective: inputs.objective.value || 'A brief summary of your career goals and what you bring to the table.',
            education: inputs.education.value || 'Degree Name, Institution, Year',
            skills: inputs.skills.value || 'Skill 1, Skill 2, Skill 3',
            experience: inputs.experience.value || 'Role Name, Company Name, Duration\nDescription of your achievements and responsibilities.',
            projects: inputs.projects.value || 'Project Name - Brief description of the project and your role.',
            links: inputs.links.value || 'linkedin.com/in/username'
        };

        let html = '';

        if (currentTemplate === 'classic') {
            resumePreview.className = 'template-classic';
            html = `
                <div class="resume-header">
                    <h1>${data.fullName}</h1>
                    <div class="contact-info">
                        <span>${data.email}</span> | 
                        <span>${data.phone}</span> | 
                        <span>${data.address}</span>
                    </div>
                    <div class="contact-info" style="margin-top: 5px;">
                        <span>${data.links}</span>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-title">Objective</div>
                    <p>${data.objective.replace(/\n/g, '<br>')}</p>
                </div>

                <div class="section">
                    <div class="section-title">Experience</div>
                    <p>${data.experience.replace(/\n/g, '<br>')}</p>
                </div>

                <div class="section">
                    <div class="section-title">Education</div>
                    <p>${data.education.replace(/\n/g, '<br>')}</p>
                </div>

                <div class="section">
                    <div class="section-title">Skills</div>
                    <p>${data.skills}</p>
                </div>

                ${data.projects ? `
                <div class="section">
                    <div class="section-title">Projects</div>
                    <p>${data.projects.replace(/\n/g, '<br>')}</p>
                </div>` : ''}
            `;
        } else if (currentTemplate === 'modern') {
            resumePreview.className = 'template-modern';
            html = `
                <div class="sidebar">
                    <h1>${data.fullName}</h1>
                    <div class="section-title">Contact</div>
                    <p style="font-size: 0.8rem; margin-bottom: 5px;">${data.email}</p>
                    <p style="font-size: 0.8rem; margin-bottom: 5px;">${data.phone}</p>
                    <p style="font-size: 0.8rem; margin-bottom: 5px;">${data.address}</p>
                    <p style="font-size: 0.8rem; margin-bottom: 5px;">${data.links}</p>

                    <div class="section-title">Skills</div>
                    <p style="font-size: 0.85rem;">${data.skills.split(',').join('<br>')}</p>
                </div>
                <div class="main-content">
                    <div class="section">
                        <div class="section-title">Profile</div>
                        <p style="font-size: 0.95rem;">${data.objective.replace(/\n/g, '<br>')}</p>
                    </div>

                    <div class="section">
                        <div class="section-title">Experience</div>
                        <p style="font-size: 0.95rem;">${data.experience.replace(/\n/g, '<br>')}</p>
                    </div>

                    <div class="section">
                        <div class="section-title">Education</div>
                        <p style="font-size: 0.95rem;">${data.education.replace(/\n/g, '<br>')}</p>
                    </div>

                    ${data.projects ? `
                    <div class="section">
                        <div class="section-title">Projects</div>
                        <p style="font-size: 0.95rem;">${data.projects.replace(/\n/g, '<br>')}</p>
                    </div>` : ''}
                </div>
            `;
        } else if (currentTemplate === 'minimal') {
            resumePreview.className = 'template-minimal';
            html = `
                <div class="resume-header">
                    <h1>${data.fullName}</h1>
                    <div class="job-title">Professional Resume</div>
                    <div style="font-size: 0.85rem; color: #666;">
                        ${data.email} &bull; ${data.phone} &bull; ${data.address}
                    </div>
                    <div style="font-size: 0.85rem; color: #666; margin-top: 4px;">
                        ${data.links}
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">Summary</div>
                    <p>${data.objective}</p>
                </div>

                <div class="section">
                    <div class="section-title">Work History</div>
                    <p>${data.experience.replace(/\n/g, '<br>')}</p>
                </div>

                <div class="section">
                    <div class="section-title">Education</div>
                    <p>${data.education.replace(/\n/g, '<br>')}</p>
                </div>

                <div class="section">
                    <div class="section-title">Expertise</div>
                    <p>${data.skills}</p>
                </div>
            `;
        }

        // Add watermark if not premium
        if (!isPremium) {
            html += `<div class="watermark hidden-print">Created with ResumeMint</div>`;
            html += `<div class="watermark" style="display: none; display: block !important; opacity: 0.3;">Created with ResumeMint</div>`;
        }

        resumePreview.innerHTML = html;
    };

    init();
});
