class Toggle {
  constructor (options) {
    // Toggle configuration
    this.config = Object.assign({
      /**
       * Toggle button data attribute name
       * @type {string}
       */
      attr: 'data-toggle',

      /**
       * CSS class to toggle on the target element
       * @type {string}
       */
      toggleClass: 'is-active',

      /**
       * Selector for closest toggle parent (in which to search for toggle targets)
       * @type {string}
       */
      toggleParentSelector: '.toggle'
    }, options)

    // Initialize component
    this.init()
  }

  /**
   * Initialize toggles
   * @return {void}
   */
  init () {
    // Toggle click listener
    document.addEventListener('click', e => this.clickHandler(e))
  }

  /**
   * Handle toggle click
   * @param {MouseEvent} e - Click event
   * @return {void}
   */
  clickHandler (e) {
    // Not a [data-toggle] click
    if (!e.target.matches(`[${this.config.attr}],[${this.config.attr}] *`)) return

    // Get toggle button
    const btn = e.target.closest(`[${this.config.attr}]`)
    if (!btn) return

    // Toggle
    this.toggle(btn)
  }

  /**
   * Toggle the given button
   * @param {HTMLElement} btn - Toggle button
   * @return {void}
   */
  toggle (btn) {
    // Get new toggle state
    const toggleState = !(btn.getAttribute('aria-expanded') === 'true')

    // Update button
    btn.setAttribute('aria-expanded', toggleState)

    // Get toggle parent
    const toggleParent = btn.closest(this.config.toggleParentSelector)
    if (!toggleParent) return

    // Get toggle targets
    const toggleTargets = toggleParent.querySelectorAll(btn.getAttribute(this.config.attr))

    // Update toggle targets
    toggleTargets.forEach(toggleTarget => {
      toggleTarget.classList[toggleState ? 'add' : 'remove'](this.config.toggleClass)
    })
  }
}

// Contact details toggle
const contactDetailsToggle = new Toggle({
  toggleParentSelector: '.media'
})
