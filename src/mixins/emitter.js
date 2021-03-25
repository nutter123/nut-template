// import Vue from 'vue'
function broadcast (eventName, params) {
	this.$children.forEach(child => {
		child.$emit.apply(child, [eventName].concat(params));
	});
}

const emmiter = {
	methods: {
		dispatch (eventName, params) {
			let parent = this.$parent || this.$root
			let name = parent.$options.name
			console.log(name)
			while (parent) {
				parent.$emit.apply(parent, [eventName].concat(params))
				parent = parent.$parent
			}
		},
		broadcast (eventName, params) {
			broadcast.call(this, eventName, params);
		}
	}
}

export default emmiter