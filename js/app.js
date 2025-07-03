new Vue({
    el: '#app',
    data: {
        menuVisible: false,
        dialogVisible: false,
        showScrollButton: false,
        form: {
            name: '',
            email: '',
            phone: '',
            message: '',
            accepted: false
        },
        error: '',
        aboutBlocks: [
            {
                title: 'Образование',
                text: 'высшее'
            },
            {
                title: 'Специальность',
                text: 'дошкольная педагогика и психология'
            },
            {
                title: 'Квалификация',
                text: 'преподаватель'
            }
        ]
    },
    methods: {
        showMenu() {
            this.menuVisible = true;
            document.body.style.overflow = 'hidden';
        },
        closeMenu() {
            this.menuVisible = false;
            document.body.style.overflow = '';
        },
        showDialog() {
            this.dialogVisible = true;
            document.body.style.overflow = 'hidden';
        },
        closeDialog() {
            this.dialogVisible = false;
            document.body.style.overflow = '';
            this.error = '';
        },
        scrollToTop(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        submitForm() {
            this.error = '';
            
            if (!this.form.name.trim()) {
                this.error = 'Поле с именем не может быть пустым!';
                return;
            }
            
            if (!/^[А-ЯЁ][а-яё]+(?:\s[А-ЯЁ][а-яё]+)*$/.test(this.form.name)) {
                this.error = 'Имя должно начинаться с заглавной буквы и содержать только русские буквы!';
                return;
            }
            
            if (!this.form.email.trim()) {
                this.error = 'Поле с почтой не может быть пустым!';
                return;
            }
            
            if (!/^\S+@\S+\.\S+$/.test(this.form.email)) {
                this.error = 'Пожалуйста, введите корректный email!';
                return;
            }
            
            if (!this.form.phone.trim()) {
                this.error = 'Поле с телефоном не может быть пустым!';
                return;
            }
            
            if (!/^(\+7|8)[\s(]?\d{3}[)\s]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(this.form.phone)) {
                this.error = 'Телефон должен быть в формате: +7(XXX)XXX-XX-XX или 8XXX XXX-XX-XX';
                return;
            }
            
            if (!this.form.message.trim()) {
                this.error = 'Поле с сообщением не может быть пустым!';
                return;
            }
            
            if (!this.form.accepted) {
                this.error = 'Вы должны согласиться с условиями!';
                return;
            }
            
            const formData = {
                name: this.form.name,
                email: this.form.email,
                phone: this.form.phone,
                message: this.form.message,
                date: new Date().toISOString()
            };
            
            const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
            submissions.push(formData);
            localStorage.setItem('formSubmissions', JSON.stringify(submissions));
            
            this.form = {
                name: '',
                email: '',
                phone: '',
                message: '',
                accepted: false
            };
            
            this.closeDialog();
            alert('Ваше сообщение отправлено!');
        },
        handleScroll() {
            this.showScrollButton = window.scrollY > 100;
        },
        handleKeydown(e) {
            if (e.key === 'Escape' && this.dialogVisible) {
                this.closeDialog();
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        document.addEventListener('keydown', this.handleKeydown);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
        document.removeEventListener('keydown', this.handleKeydown);
    }
});
document.getElementById('Menu').addEventListener('click', function() {
  this.classList.toggle('active');
  document.querySelector('.menu').classList.toggle('active');
  document.body.style.overflow = document.querySelector('.menu').classList.contains('active') ? 'hidden' : '';
});