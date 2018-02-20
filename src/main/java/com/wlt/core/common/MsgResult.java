package com.wlt.core.common;
public class MsgResult {

	public MsgResult() {
	}

	public MsgResult(Object data) {
		this.data = data;
	}
	public MsgResult(String code, Object data) {
		this.code = code;
		this.data = data;
	}

	protected Object data;
	private String code = "ok";
	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
//	public String toJsonString() {
//		try {
//			return BeanConvertUtil.Obj2String(this);
//		} catch (UnsupportedEncodingException e) {
//			e.printStackTrace();
//		}
//		return null;
//	}
}
