// 管理者機能専用JavaScriptファイル
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminFeatures();
});

// 管理者機能の初期化
function initializeAdminFeatures() {
    // データテーブルの初期化
    initializeDataTables();
    
    // モーダルの初期化
    initializeModals();
    
    // 検索機能の初期化
    initializeSearchFeatures();
    
    // 統計データの更新
    updateAdminStats();
}

// データテーブルの初期化
function initializeDataTables() {
    const tables = document.querySelectorAll('.data-table');
    
    tables.forEach(table => {
        // ソート機能の追加
        addSortingToTable(table);
        
        // ページネーション機能の追加
        addPaginationToTable(table);
    });
}

// テーブルにソート機能を追加
function addSortingToTable(table) {
    const headers = table.querySelectorAll('th[data-sortable]');
    
    headers.forEach(header => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', function() {
            sortTable(table, this);
        });
    });
}

// テーブルのソート
function sortTable(table, header) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const columnIndex = Array.from(header.parentNode.children).indexOf(header);
    const isAscending = header.classList.contains('sort-asc');
    
    // ソート方向の切り替え
    table.querySelectorAll('th').forEach(th => {
        th.classList.remove('sort-asc', 'sort-desc');
    });
    
    header.classList.add(isAscending ? 'sort-desc' : 'sort-asc');
    
    // 行のソート
    rows.sort((a, b) => {
        const aValue = a.children[columnIndex].textContent.trim();
        const bValue = b.children[columnIndex].textContent.trim();
        
        if (isAscending) {
            return bValue.localeCompare(aValue);
        } else {
            return aValue.localeCompare(bValue);
        }
    });
    
    // ソートされた行を再配置
    rows.forEach(row => tbody.appendChild(row));
}

// テーブルにページネーション機能を追加
function addPaginationToTable(table) {
    const rowsPerPage = 10;
    const totalRows = table.querySelectorAll('tbody tr').length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    
    if (totalPages <= 1) return;
    
    const pagination = createPagination(totalPages, rowsPerPage);
    table.parentNode.appendChild(pagination);
    
    // 初期表示
    showTablePage(table, 1, rowsPerPage);
}

// ページネーション要素の作成
function createPagination(totalPages, rowsPerPage) {
    const pagination = document.createElement('div');
    pagination.className = 'pagination';
    pagination.innerHTML = `
        <button onclick="showTablePage(this.closest('.pagination').previousElementSibling, 1, ${rowsPerPage})">最初</button>
        <button onclick="showTablePage(this.closest('.pagination').previousElementSibling, Math.max(1, getCurrentPage(this) - 1), ${rowsPerPage})">前へ</button>
        <span id="pageInfo">1 / ${totalPages}</span>
        <button onclick="showTablePage(this.closest('.pagination').previousElementSibling, Math.min(${totalPages}, getCurrentPage(this) + 1), ${rowsPerPage})">次へ</button>
        <button onclick="showTablePage(this.closest('.pagination').previousElementSibling, ${totalPages}, ${rowsPerPage})">最後</button>
    `;
    
    return pagination;
}

// テーブルページの表示
function showTablePage(table, page, rowsPerPage) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    
    // すべての行を非表示
    rows.forEach(row => row.style.display = 'none');
    
    // 表示する行を表示
    rows.slice(startIndex, endIndex).forEach(row => {
        row.style.display = '';
    });
    
    // ページ情報の更新
    const pageInfo = table.parentNode.querySelector('#pageInfo');
    if (pageInfo) {
        const totalPages = Math.ceil(rows.length / rowsPerPage);
        pageInfo.textContent = `${page} / ${totalPages}`;
    }
}

// 現在のページ番号を取得
function getCurrentPage(element) {
    const pageInfo = element.closest('.pagination').querySelector('#pageInfo');
    return parseInt(pageInfo.textContent.split(' / ')[0]);
}

// モーダルの初期化
function initializeModals() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        // モーダル外クリックで閉じる
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
        
        // ESCキーで閉じる
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    });
}

// 検索機能の初期化
function initializeSearchFeatures() {
    const searchInputs = document.querySelectorAll('input[type="text"]');
    
    searchInputs.forEach(input => {
        if (input.placeholder && input.placeholder.includes('検索')) {
            input.addEventListener('input', debounce(function() {
                performSearch(this);
            }, 300));
        }
    });
}

// 検索の実行
function performSearch(input) {
    const searchTerm = input.value.toLowerCase();
    const table = input.closest('.main-content').querySelector('.data-table');
    
    if (!table) return;
    
    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// 管理者統計の更新
function updateAdminStats() {
    // 実際の実装ではAPIからデータを取得
    const stats = {
        totalUsers: 150,
        totalResources: 25,
        activeUsers: 120,
        totalViews: 2500
    };
    
    Object.keys(stats).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            animateNumber(element, stats[key]);
        }
    });
}

// 数値のアニメーション
function animateNumber(element, targetNumber) {
    const startNumber = 0;
    const duration = 1000;
    const increment = targetNumber / (duration / 16);
    let currentNumber = startNumber;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentNumber);
    }, 16);
}

// デバウンス関数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// エクスポート
window.AdminFeatures = {
    updateAdminStats,
    showTablePage,
    performSearch
};



