const state = {
    selectedPageIndex: 0,
    comments: [],
    slicedComments: [],
    itemsPerPage: 55
}
var start = 0;
var end = state.itemsPerPage;

window.onload = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments');
    const comments = await (res.ok ? res.json() : Promise.resolve([]));
    state.comments = comments;
    state.slicedComments = comments.slice(start, end);
    console.log(state);
    render();
}

function navigate(selectedPageIndex) {
    start = selectedPageIndex * state.itemsPerPage;
    end = start + state.itemsPerPage
    state.selectedPageIndex = selectedPageIndex;
    state.slicedComments = state.comments.slice(start, end);
    render();
}

function render() {
    const numberOfPages = Math.ceil(state.comments.length / state.itemsPerPage);
    const indexes = Array.from(Array(numberOfPages).keys());

    const buttons = indexes.map((num, i) => {
        return `<li class="page-item" ${state.selectedPageIndex === i ? "active" : ""}>
        <span class="page-link" onclick="navigate(${num})">
           ${num + 1}
        </span>
        </li>
       `;
    });

    // Elemek kirenderelése
    document.getElementById("comments_component").innerHTML = `
    <nav>
    <ul class="pagination">
        ${buttons.join('')}
    </ul>
    </nav>

        <div class="border" style="height: calc(100vh - 100px); overflow-y: scroll;">
            ${state.slicedComments.reduce((a, cr) => {
                return a + `
                    <div class="list-group-item">
                        #${cr.id} ${cr.name}<br>
                        <small>${cr.body}</small>
                    </div>
                `;
            }, "")}
        </div>
    `;
}