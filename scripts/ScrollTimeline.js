if (window.ScrollTimeline) {
    const body = document.getElementById("home");

    const timeline = new ScrollTimeline({
        source: document.documentElement,
        axis: "block"
    });

    body.animate(
        {
            backgroundColor: ["hsl(204, 45%, 98%)", "#e0e7ff"] // [from, to]
        },
        {
            timeline
        }
    );
}
