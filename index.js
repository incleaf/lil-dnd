class LilDnd {
  constructor(target) {
    let _target = target

    if (typeof target === 'string') {
      _target = document.querySelector(target)
    }

    if (!_target instanceof Element) {
      throw new Error('The target should be either a DOM Element or selector')
    }

    this.wrapper = _target
    this.draggableElements = _target.children
    this.init()
  }

  init() {
    let isDragging = false
    let draggingElement
    let draggingElementOriginalPosition
    let fakeNode
    let previousSibling
    let previousSibBreakingPoint
    let nextSibling
    let nextSibBreakingPoint

    for (let i = 0; i < this.draggableElements.length; i++) {
      this.draggableElements[i].dataset.isDraggable = true
    }

    const updateSibling = targetElement => {
      previousSibling = targetElement.previousElementSibling
      previousSibBreakingPoint = previousSibling && previousSibling.offsetTop
      nextSibling = targetElement.nextElementSibling
      nextSibBreakingPoint = nextSibling && nextSibling.offsetTop + nextSibling.offsetHeight
    }

    this.wrapper.addEventListener('mousedown', e => {
      if (e.target.dataset.isDraggable) {
        isDragging = true
        draggingElement = e.target

        updateSibling(draggingElement)

        // TODO: Replace to fake element that has same offset of draggingElment, not a clone element
        fakeNode = draggingElement.cloneNode();
        fakeNode.style.background = '#fff'
        this.wrapper.insertBefore(fakeNode, draggingElement.nextElementSibling)

        draggingElementOriginalPosition = draggingElement.style.position
        draggingElement.style.position = 'absolute'
        draggingElement.style.left = `${e.clientX - draggingElement.offsetWidth / 2}px`
        draggingElement.style.top = `${e.clientY - draggingElement.offsetHeight / 2}px`
      }
    })

    this.wrapper.addEventListener('mousemove', e => {
      if (isDragging) {
        draggingElement.style.left = `${e.clientX - draggingElement.offsetWidth / 2}px`
        draggingElement.style.top = `${e.clientY - draggingElement.offsetHeight / 2}px`

        if (previousSibling && e.clientY < previousSibBreakingPoint && !(fakeNode.offsetTop < previousSibBreakingPoint)) {
          this.wrapper.removeChild(fakeNode)
          this.wrapper.insertBefore(fakeNode, previousSibling)
          updateSibling(fakeNode)
        } else if (nextSibling && e.clientY > nextSibBreakingPoint && !(fakeNode.offsetTop > nextSibBreakingPoint)) {
          this.wrapper.removeChild(fakeNode)
          this.wrapper.insertBefore(fakeNode, nextSibling.nextElementSibling)
          updateSibling(fakeNode)
        }
      }
    })

    this.wrapper.addEventListener('mouseup', e => {
      if (isDragging) {
        this.wrapper.insertBefore(draggingElement, fakeNode)
        this.wrapper.removeChild(fakeNode)
        draggingElement.style.position = draggingElementOriginalPosition
        isDragging = false
      }
    })
  }
}

