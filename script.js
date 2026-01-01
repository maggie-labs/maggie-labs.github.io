document.addEventListener('DOMContentLoaded', () => {
    // 1. 动词数据库 (内置高频动词)
    const verbData = {
        "être": { meaning: "是 / 存在", je: "suis", tu: "es", il: "est", nous: "sommes", vous: "êtes", ils: "sont" },
        "avoir": { meaning: "有", je: "ai", tu: "as", il: "a", nous: "avons", vous: "avez", ils: "ont" },
        "faire": { meaning: "做", je: "fais", tu: "fais", il: "fait", nous: "faisons", vous: "faites", ils: "font" },
        "aller": { meaning: "去", je: "vais", tu: "vas", il: "va", nous: "allons", vous: "allez", ils: "vont" },
        "dire": { meaning: "说", je: "dis", tu: "dis", il: "dit", nous: "disons", vous: "dites", ils: "disent" },
        "manger": { meaning: "吃", je: "mange", tu: "manges", il: "mange", nous: "mangeons", vous: "mangez", ils: "mangent" },
        "aimer": { meaning: "喜欢", je: "aime", tu: "aimes", il: "aime", nous: "aimons", vous: "aimez", ils: "aiment" },
        "voir": { meaning: "看", je: "vois", tu: "vois", il: "voit", nous: "voyons", vous: "voyez", ils: "voient" },
        "pouvoir": { meaning: "能够", je: "peux", tu: "peux", il: "peut", nous: "pouvons", vous: "pouvez", ils: "peuvent" },
        "prendre": { meaning: "拿 / 乘坐", je: "prends", tu: "prends", il: "prend", nous: "prenons", vous: "prenez", ils: "prennent" }
    };

    const searchInput = document.getElementById('verb-search');
    const suggestions = document.getElementById('suggestions');

    // 2. 更新变位表函数
    function updateConjugation(verb) {
        const data = verbData[verb.toLowerCase()];
        if (data) {
            document.getElementById('current-verb').textContent = verb;
            document.getElementById('verb-meaning').textContent = data.meaning;
            document.getElementById('c-je').textContent = data.je;
            document.getElementById('c-tu').textContent = data.tu;
            document.getElementById('c-il').textContent = data.il;
            document.getElementById('c-nous').textContent = data.nous;
            document.getElementById('c-vous').textContent = data.vous;
            document.getElementById('c-ils').textContent = data.ils;
        }
    }

    // 搜索逻辑
    searchInput.addEventListener('input', (e) => {
        const val = e.target.value.trim().toLowerCase();
        if (val && verbData[val]) {
            updateConjugation(val);
        }
    });

    // 3. 简单的自动联想建议
    searchInput.addEventListener('keyup', (e) => {
        const val = e.target.value.trim().toLowerCase();
        suggestions.innerHTML = '';
        if (val) {
            const matches = Object.keys(verbData).filter(v => v.startsWith(val));
            matches.forEach(m => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.textContent = m;
                div.onclick = () => {
                    searchInput.value = m;
                    updateConjugation(m);
                    suggestions.innerHTML = '';
                };
                suggestions.appendChild(div);
            });
        }
    });

    // 4. 主题切换
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    });
});
