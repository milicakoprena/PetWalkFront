import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Form, Input, Select, Menu } from "antd";
import TextArea from "rc-textarea";
const Option = Select.Option;


const OwnerMenuPage = () => {
    const [form] = Form.useForm();
    return (
        <div>
            <Menu
                items={[
                    {label:"Home"}
                ]}
            ></Menu>
        </div>
    );
};

export default OwnerMenuPage;
