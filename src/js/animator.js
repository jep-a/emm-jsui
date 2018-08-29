import PageAnimator from './animators/page'
import NavAnimator from './animators/nav'

export default class Animator {
	nav = new NavAnimator
	page = new PageAnimator
}