var EventUtil = {

    /**
     * add event
     * @param element
     * @param type
     * @param handler
     */
    addHandler: function(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },

    /**
     * 得知用户是鼠标左击/鼠标滑轮按钮/鼠标右击。
     * DOM的button属性可能有如下3个值：
     * 0表示主鼠标按钮，即鼠标左击
     * 1表示中间鼠标按钮
     * 2表示次鼠标按钮。
     * 但是万恶的IE8及之前的版本提供的button属性值与DOM的属性值差别比较大，下面是做过兼容处理的
     * @param event
     * @returns {number}
     */
    getButton: function(event){
        if (document.implementation.hasFeature("MouseEvents", "2.0")){
            return event.button;
        } else {
            switch(event.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4: return 1;
            }
        }
    },

    /**
     * 获取字符编码
     * @param event
     * @returns {number}
     */
    getCharCode: function(event){
        if (typeof event.charCode == "number"){
            return event.charCode;
        } else {
            return event.keyCode;
        }
    },

    /**
     * 设置剪贴板的内容，
     * @param event
     * @param value
     */
    setClipboardText: function(event, value){
        if (event.clipboardData){
            event.clipboardData.setData("text/plain", value);
        } else if (window.clipboardData){//兼容IE
            window.clipboardData.setData("text", value);
        }
    },

    /**
     * 获取剪贴板的内容。
     * 在IE中，clipboardData对象是window对象的属性
     * 而在FF4+，Safari，Chrome中clipboardData对象是相应的event对象的属性
     * @param event
     * @returns {string}
     */
    getClipboardText: function(event){
        var clipboardData =  (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },

    /**get event
     * window.event in IE browser
     * @param event
     * @returns {Event}
     */
    getEvent: function(event){
        return event ? event : window.event;
    },

    /**
     * DOM通过event对象的relatedTarget属性提供了相关元素的属性
     * @param event
     * @returns {*}
     */
    getRelatedTarget: function(event){
        if (event.relatedTarget){
            return event.relatedTarget;
        } else if (event.toElement){
            return event.toElement;
        } else if (event.fromElement){
            return event.fromElement;
        } else {
            return null;
        }
    
    },

    /**
     * get event target
     * event.srcElement in IE browser
     * @param event
     * @returns {*|Object}
     */
    getTarget: function(event){
        return event.target || event.srcElement;
    },

    /**
     * 鼠标滚轮事件，判断鼠标的滚轮是上滚还是下滚
     * 当用户向前滚动鼠标滚轮的时候，wheelDelta是120的整数倍，相反则是-120的整数倍
     * @param event
     * @returns {*}
     */
    getWheelDelta: function(event){
        if (event.wheelDelta){//FireFox9.5及之前的版本中，wheelDelta值的正负号是颠倒的，
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        } else { //兼容火狐，火狐的DOMMouseScroll(event.detail)事件就是mouseWhell(event.wheelDelta)，
            return -event.detail * 40;
        }
    },

    /**
     * prevent default action of event
     * event.returnValue=false in IE browser
     * @param event
     */
    preventDefault: function(event){
        if (event.preventDefault){
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    /**
     * remove event
     * @param element
     * @param type
     * @param handler
     */
    removeHandler: function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){ //IE
            element.detachEvent("on" + type, handler);
        } else { //DOM0
            element["on" + type] = null;
        }
    },

    /**
     * stop event bubbing
     * event.cancelBubble=true in IE browser;
     * @param event
     */
    stopPropagation: function(event){
        if (event.stopPropagation){
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }

};