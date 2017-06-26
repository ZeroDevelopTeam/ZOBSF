<template>
	<section>
		在线回收
	</section>
</template>

<script>
	export default {
		data() {
		    return {
		        search: '',
		        hotBook:'1',
		    }
		  },
		methods: {
		    handleClick(tab, event) {
		        console.log(tab, event);
		    }
  		},
  		mounted(){
  		},
  		components: {
		}
	}

</script>

<style  lang="scss">

</style>