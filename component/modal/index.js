Component({
	
	  /**
	   * 组件的属性列表
	   */
	  props: {
	
	    //是否显示modal
	    show: false,
	
	    // submit()
	    onSubmit:(data) => console.log(data),
	
	    // onCancel()
	    onCancel:(data) => console.log(data),
	  },
	
	  /**
	   * 组件的初始数据
	   */
	  data: {
      
	  },
	
	  /**
	   * 组件的方法列表
	   */
	  methods: {
	    clickMask() {
	      // this.setData({show: false})
	    },
	
	    cancel(e) {
	      this.props.onCancel(e);
	    },
	
	    submit(e) {
	      this.props.onSubmit(e);
	    }
	  }
	})
