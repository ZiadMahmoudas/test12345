const backdrop = document.getElementById('backdrop');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileSearch = document.getElementById('mobile-search');

        function openMenu() {
            closePopups(); // عشان لو السيرش مفتوح يتقفل الأول
            mobileMenu.classList.add('active');
            backdrop.classList.add('active');
            document.body.style.overflow = 'hidden'; // يمنع السكرول
        }

        function openSearch() {
            closePopups(); 
            mobileSearch.classList.add('active');
            backdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
            // يعمل فوكس على الانبوت تلقائي
            setTimeout(() => { mobileSearch.querySelector('input').focus(); }, 400);
        }

        function closePopups() {
            mobileMenu.classList.remove('active');
            mobileSearch.classList.remove('active');
            backdrop.classList.remove('active');
            document.body.style.overflow = 'auto'; // يرجع السكرول
        }

        // لو داس على الخلفية السودة (البرا) يقفل البوب أب
        backdrop.addEventListener('click', closePopups);
                // 1. فتح وقفل الفلتر بانسيابية
        function toggleFilters() {
            const wrapper = document.getElementById('filterWrapper');
            // لو مفتوح اقفله والعكس
            wrapper.classList.toggle('active');
            
            // قفل قائمة الترتيب لو مفتوحة عشان الشكل ميبوظش
            document.getElementById('sortDropdown').classList.remove('open');
        }

        // 2. منطق قائمة الترتيب (Dropdown)
        function toggleSort() {
            document.getElementById('sortDropdown').classList.toggle('open');
        }

        function selectSort(element) {
            document.querySelectorAll('.dropdown-menu li').forEach(el => el.classList.remove('active'));
            element.classList.add('active');
            document.getElementById('sortText').innerText = element.innerText;
            document.getElementById('sortDropdown').classList.remove('open');
        }

        // إغلاق المنيو لو ضغط بره
        document.addEventListener('click', (e) => {
            const dropdown = document.getElementById('sortDropdown');
            if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
        });

        // 3. منطق تقليب الصفحات (Pagination Functionality)
        let currentPage = 1;
        const totalPages = 4;

        function changePage(pageAction) {
            // تحديد الصفحة المستهدفة
            let targetPage = currentPage;
            if (pageAction === 'prev' && currentPage > 1) targetPage--;
            else if (pageAction === 'next' && currentPage < totalPages) targetPage++;
            else if (typeof pageAction === 'number') targetPage = pageAction;

            if (targetPage === currentPage) return; // لو ضغط على نفس الصفحة متعملش حاجة
            
            currentPage = targetPage;

            // تحديث أزرار الأرقام
            document.querySelectorAll('.page-num').forEach(btn => {
                btn.classList.remove('active');
                if (parseInt(btn.innerText) === currentPage) btn.classList.add('active');
            });

            // تحديث الأسهم
            document.getElementById('prevBtn').classList.toggle('disabled', currentPage === 1);
            document.getElementById('nextBtn').classList.toggle('disabled', currentPage === totalPages);

            // أنيميشن تغيير المحتوى
            const list = document.getElementById('complaintsList');
            const loader = document.getElementById('pageLoader');
            
            list.style.opacity = '0'; // اختفاء ناعم للمحتوى الحالي

            setTimeout(() => {
                list.style.display = 'none';
                loader.style.display = 'block'; // إظهار علامة التحميل
                
                // محاكاة تحميل بيانات من السيرفر (بعد نص ثانية)
                setTimeout(() => {
                    loader.style.display = 'none';
                    list.style.display = 'block';
                    
                    // تغيير المحتوى كمثال
                    list.innerHTML = `
                        <div style="padding: 40px; text-align: center; background: #fff; border-radius: 8px;">
                            <h2 style="color: var(--primary-purple);">Page ${currentPage}</h2>
                            <p style="color: var(--text-gray); margin-top: 10px;">Displaying new complaints for page ${currentPage}...</p>
                        </div>
                    `;
                    
                    // إظهار ناعم للمحتوى الجديد
                    setTimeout(() => list.style.opacity = '1', 50);
                }, 500);

            }, 300); // استنى الـ opacity تخلص الأول
        }
           function toggleAccordion(btn) {
            const item = btn.parentElement;
            const body = item.querySelector('.accordion-body');
            const isActive = item.classList.contains('active');

            document.querySelectorAll('.accordion-item').forEach(el => {
                el.classList.remove('active');
                el.querySelector('.accordion-body').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                body.style.maxHeight = body.scrollHeight + "px";
            }
        }
//         (function() {
//     'use strict';
//     document.addEventListener('contextmenu', function(e) {
//         e.preventDefault();
//     });

//     document.addEventListener('keydown', function(e) {
//         if (e.key === 'F12' || e.keyCode === 123) {
//             e.preventDefault();
//             return false;
//         }

//         if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
//             e.preventDefault();
//             return false;
//         }

//    if (e.ctrlKey && (e.key === 'u' || e.keyCode === 85)) {
//         e.preventDefault();
//         return false;
//     }
//     });

//     const devToolsCheck = function() {
//         if (window.console && window.console.time) {
//                 (function() {
//                     (function() {
//                         debugger;
//                     }).apply(this, ['alwaysOn']);
//                 })();
         
//         }
//     };
    

//     setInterval(devToolsCheck, 1000);


//     document.addEventListener('copy', function(e) {
//         e.preventDefault();
//     });

// })();

  const langWrapper = document.getElementById('langWrapper');
        
        function toggleLang(e) {
            e.stopPropagation();
            langWrapper.classList.toggle('active');
            // تغيير السهم فوق/تحت
            const icon = langWrapper.querySelector('.lang-btn i');
            if(langWrapper.classList.contains('active')) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        }

        function selectLang(countryCode, langName, element) {
            // تغيير النص والصورة في الزرار
            document.getElementById('selectedFlag').src = `https://flagcdn.com/w20/${countryCode}.png`;
            document.getElementById('selectedLangText').innerText = langName;
            
            // تغيير اللون البنفسجي للعنصر المختار
            document.querySelectorAll('.lang-menu li').forEach(li => li.classList.remove('active'));
            element.classList.add('active');
            
            // قفل القائمة
            langWrapper.classList.remove('active');
            langWrapper.querySelector('.lang-btn i').classList.replace('fa-chevron-down', 'fa-chevron-up');
        }

        // قفل القائمة لو ضغطت في أي مكان بره
        document.addEventListener('click', function(e) {
            if (!langWrapper.contains(e.target)) {
                langWrapper.classList.remove('active');
                langWrapper.querySelector('.lang-btn i').classList.replace('fa-chevron-down', 'fa-chevron-up');
            }
        });