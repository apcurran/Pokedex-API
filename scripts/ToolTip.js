function initAbilityTooltip() {
    const trigger = document.getElementById("ability-tooltip-trigger");
    const tooltip = document.getElementById("ability-tooltip");

    if (!trigger || !tooltip) {
        return;
    }

    trigger.addEventListener("mouseenter", () => {
        tooltip.showPopover();
    });

    trigger.addEventListener("mouseleave", () => {
        tooltip.hidePopover();
    });
}

export { initAbilityTooltip };
