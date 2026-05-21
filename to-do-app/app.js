// ─── DB Layer (localStorage as db.json) ─────────────────────────────────────

const db = {
    getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    },
    setUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    },
    getTodos() {
        return JSON.parse(localStorage.getItem('todos')) || [];
    },
    setTodos(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
    },
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser')) || null;
    },
    setCurrentUser(user) {
        if (user) localStorage.setItem('currentUser', JSON.stringify(user));
        else localStorage.removeItem('currentUser');
    }
};

// ─── View Manager ────────────────────────────────────────────────────────────

const views = {
    login:     document.getElementById('view-login'),
    register:  document.getElementById('view-register'),
    dashboard: document.getElementById('view-dashboard'),
};

function switchView(name) {
    Object.values(views).forEach(v => v.classList.remove('active'));
    views[name].classList.add('active');
    clearAllErrors();
    clearForms();
}

// ─── Error Helpers ───────────────────────────────────────────────────────────

function showError(id, msg) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg || '';
    el.style.display = msg ? 'block' : 'none';
}

function clearAllErrors() {
    document.querySelectorAll('.error-msg, .alert-box').forEach(el => {
        el.style.display = 'none';
        el.textContent = '';
    });
}

function clearForms() {
    ['form-login', 'form-register'].forEach(id => {
        const form = document.getElementById(id);
        if (form) form.reset();
    });
}

// ─── Auth: Register ──────────────────────────────────────────────────────────

document.getElementById('form-register').addEventListener('submit', function (e) {
    e.preventDefault();
    clearAllErrors();

    const name     = document.getElementById('reg-name').value.trim();
    const email    = document.getElementById('reg-email').value.trim().toLowerCase();
    const password = document.getElementById('reg-password').value;

    let valid = true;

    if (!name) { showError('err-reg-name', 'Informe seu nome.'); valid = false; }
    if (!email || !/\S+@\S+\.\S+/.test(email)) { showError('err-reg-email', 'Informe um e-mail valido.'); valid = false; }
    if (password.length < 6) { showError('err-reg-password', 'A senha deve ter pelo menos 6 caracteres.'); valid = false; }

    if (!valid) return;

    const users = db.getUsers();

    if (users.some(u => u.email === email)) {
        showError('err-reg-general', 'Este e-mail ja esta cadastrado.');
        return;
    }

    const newUser = { id: Date.now().toString(), name, email, password };
    users.push(newUser);
    db.setUsers(users);
    db.setCurrentUser({ id: newUser.id, name: newUser.name, email: newUser.email });

    initDashboard();
    switchView('dashboard');
});

// ─── Auth: Login ─────────────────────────────────────────────────────────────

document.getElementById('form-login').addEventListener('submit', function (e) {
    e.preventDefault();
    clearAllErrors();

    const email    = document.getElementById('login-email').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;

    let valid = true;

    if (!email) { showError('err-login-email', 'Informe o e-mail.'); valid = false; }
    if (!password) { showError('err-login-password', 'Informe a senha.'); valid = false; }

    if (!valid) return;

    const users = db.getUsers();
    const user  = users.find(u => u.email === email);

    if (!user) {
        showError('err-login-general', 'E-mail nao encontrado. Verifique ou crie uma conta.');
        return;
    }

    if (user.password !== password) {
        showError('err-login-general', 'Senha incorreta. Tente novamente.');
        return;
    }

    db.setCurrentUser({ id: user.id, name: user.name, email: user.email });
    initDashboard();
    switchView('dashboard');
});

// ─── Auth: Logout ────────────────────────────────────────────────────────────

document.getElementById('btn-logout').addEventListener('click', () => {
    db.setCurrentUser(null);
    switchView('login');
});

// ─── Navigation Links ────────────────────────────────────────────────────────

document.getElementById('btn-go-register').addEventListener('click', () => switchView('register'));
document.getElementById('btn-go-login').addEventListener('click', () => switchView('login'));

// ─── Dashboard ───────────────────────────────────────────────────────────────

function initDashboard() {
    const user = db.getCurrentUser();
    if (!user) return;

    document.getElementById('header-greeting').textContent = 'Ola, ' + user.name;
    renderTodos();
}

// ─── Todo: Add ───────────────────────────────────────────────────────────────

document.getElementById('form-todo').addEventListener('submit', function (e) {
    e.preventDefault();

    const title       = document.getElementById('todo-title').value.trim();
    const type        = document.getElementById('todo-type').value;
    const description = document.getElementById('todo-description').value.trim();

    if (!title) {
        showError('err-todo-title', 'O titulo e obrigatorio.');
        return;
    }

    showError('err-todo-title', '');

    const user  = db.getCurrentUser();
    const todos = db.getTodos();

    todos.push({
        id:          Date.now().toString(),
        userId:      user.email,
        title,
        type,
        description,
        done:        false,
        createdAt:   Date.now()
    });

    db.setTodos(todos);
    this.reset();
    renderTodos();
});

// ─── Todo: Complete ──────────────────────────────────────────────────────────

function completeTodo(id) {
    const todos = db.getTodos();
    const idx   = todos.findIndex(t => t.id === id);
    if (idx === -1) return;
    todos[idx].done = true;
    db.setTodos(todos);
    renderTodos();
}

// ─── Todo: Delete ────────────────────────────────────────────────────────────

function deleteTodo(id) {
    const todos  = db.getTodos().filter(t => t.id !== id);
    db.setTodos(todos);
    renderTodos();
}

// ─── Todo: Render ────────────────────────────────────────────────────────────

const badgeMap = {
    trabalho: ['badge-trabalho', 'Trabalho'],
    pessoal:  ['badge-pessoal',  'Pessoal'],
    estudos:  ['badge-estudos',  'Estudos'],
};

function renderTodos() {
    const user    = db.getCurrentUser();
    const todos   = db.getTodos().filter(t => t.userId === user.email);
    const list    = document.getElementById('todo-list');
    const empty   = document.getElementById('todo-empty');

    // Sort: pending first, done last
    todos.sort((a, b) => {
        if (a.done !== b.done) return a.done ? 1 : -1;
        return b.createdAt - a.createdAt;
    });

    // Update stats
    const total    = todos.length;
    const doneCount = todos.filter(t => t.done).length;
    const percent  = total > 0 ? Math.round((doneCount / total) * 100) : 0;

    document.getElementById('stat-total').textContent = total + (total === 1 ? ' tarefa' : ' tarefas');
    document.getElementById('stat-done').textContent  = doneCount + (doneCount === 1 ? ' concluida' : ' concluidas');
    document.getElementById('progress-fill').style.width = percent + '%';

    if (total === 0) {
        list.innerHTML  = '';
        empty.classList.remove('hidden');
        return;
    }

    empty.classList.add('hidden');

    list.innerHTML = todos.map(todo => {
        const [badgeClass, badgeLabel] = badgeMap[todo.type] || ['badge-trabalho', todo.type];
        const descHtml = todo.description
            ? `<p class="text-slate-400 text-sm mt-1 leading-relaxed">${escapeHtml(todo.description)}</p>`
            : '';

        return `
        <div class="todo-card ${todo.done ? 'done' : ''}" id="card-${todo.id}">
            <div class="flex items-start justify-between gap-3">
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 flex-wrap mb-1">
                        <span class="todo-title font-semibold text-white text-sm truncate">${escapeHtml(todo.title)}</span>
                        <span class="badge ${badgeClass}">${badgeLabel}</span>
                        ${todo.done ? '<span class="text-xs text-emerald-500 font-medium">Concluida</span>' : ''}
                    </div>
                    ${descHtml}
                </div>
                <div class="flex items-center gap-2 shrink-0">
                    <button
                        class="btn-concluir"
                        onclick="completeTodo('${todo.id}')"
                        ${todo.done ? 'disabled' : ''}
                        id="btn-complete-${todo.id}"
                    >
                        ${todo.done ? 'Feito' : 'Concluir'}
                    </button>
                    <button
                        class="btn-delete"
                        onclick="deleteTodo('${todo.id}')"
                        id="btn-delete-${todo.id}"
                    >
                        Excluir
                    </button>
                </div>
            </div>
        </div>`;
    }).join('');
}

// ─── Util ────────────────────────────────────────────────────────────────────

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// ─── Boot ────────────────────────────────────────────────────────────────────

(function boot() {
    const user = db.getCurrentUser();
    if (user) {
        initDashboard();
        switchView('dashboard');
    } else {
        switchView('login');
    }
})();
