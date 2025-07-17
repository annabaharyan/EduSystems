import { Form, Input, DatePicker, Flex } from "antd";
import moment from "moment";

import { ReactNode } from "react";
import type { EduFormValues } from "../types";


type EduFormProps = {
  slug: string;
  values: {
    name: string;
    abbreviation: string;
  };
  onChange: (slug: string, values: { name: string; abbreviation: string }) => void;
  mode: "add" | "edit";
};

const EduForm = ({ slug, values, onChange, mode }: EduFormProps) => {
  const baseURL= import.meta.env.VITE_API_URL
  const handleInputChange = (field: keyof EduFormValues, value: string | null) => {
    onChange(slug, {
      ...values,
      [field]: value,
    });
  };

  return (
    <Form layout="vertical" autoComplete="off" style={{ maxWidth: 600 }}>
      <Form.Item
        label="Name"
        required
        rules={[{ required: true, message: "Please input the name!" }]}
      >
        <Input
          value={values.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          suffix={
            <img
              src={`${baseURL}/flags/${slug}.svg`}
              alt="flag"
              style={{ width: 15, height: 15, borderRadius: "50%" }}
            />
          }
        />
      </Form.Item>

      <Form.Item
        label="Abbreviation"
        required
        rules={[{ required: true, message: "Please input the abbreviation!" }]}
      >
        <Input
          value={values.abbreviation}
          onChange={(e) => handleInputChange("abbreviation", e.target.value)}
          suffix={
            <img
              src={`${baseURL}/flags/${slug}.svg`}
              alt="flag"
              style={{ width: 15, height: 15, borderRadius: "50%" }}
            />
          }
        />
      </Form.Item>

      {mode === "add" && (
        <Flex justify="space-between" gap={20}>
          <Form.Item
            label="Start Date"
            style={{ flex: 1 }}
            rules={[{ required: true, message: "Please select the start date!" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              disabledDate={(current) => current && current > moment().endOf("day")}
            />
          </Form.Item>

          <Form.Item label="End Date" style={{ flex: 1 }}>
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              disabledDate={(current) => current && current > moment().endOf("day")}
              allowClear
            />
          </Form.Item>
        </Flex>
      ) as ReactNode}
    </Form>
  );
};

export default EduForm;


