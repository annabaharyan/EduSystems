import { Form, Input, DatePicker, Flex } from "antd";
import dayjs from "dayjs";
import { ReactNode } from "react";
import type { EduFormValues } from "../types";

type EduFormProps = {
  slug: string;
  values: { name: string; abbreviation: string };
  onChange: (slug: string, values: { name: string; abbreviation: string }) => void;
  mode: "add" | "edit";
  startDate: string | null;
  endDate: string | null;
  onStartDateChange: (date: string | null) => void;
  onEndDateChange: (date: string | null) => void;
};

const EduForm = ({
                   slug,
                   values,
                   onChange,
                   mode,
                   startDate,
                   endDate,
                   onStartDateChange,
                   onEndDateChange,
                 }: EduFormProps) => {
  const baseURL = import.meta.env.VITE_API_URL;

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
          style={{height:'44px' }}
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
          style={{height:'44px' }}
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
              style={{ width: "100%",height:'44px'  }}
              format="DD/MM/YYYY"
              value={startDate ? dayjs(startDate) : null}
              onChange={(date) => onStartDateChange(date ? date.format("YYYY-MM-DD") : null)}
              disabledDate={(current) => {
                const today = dayjs().startOf("day");
                const selectedEnd = endDate ? dayjs(endDate) : null;

                return (
                  (current && current.isBefore(today, "day")) ||
                  (selectedEnd && current.isAfter(selectedEnd, "day"))
                );
              }}
            />
          </Form.Item>

          <Form.Item label="End Date" style={{ flex: 1 }}>
            <DatePicker
              style={{ width: "100%", height:'44px' }}
              format="DD/MM/YYYY"
              value={endDate ? dayjs(endDate) : null}
              onChange={(date) => onEndDateChange(date ? date.format("YYYY-MM-DD") : null)}
              disabledDate={(current) => {
                const today = dayjs().startOf("day");
                const selectedStart = startDate ? dayjs(startDate) : null;

                return (
                  (current && current.isBefore(today, "day")) ||
                  (selectedStart && current.isBefore(selectedStart, "day"))
                );
              }}
              allowClear
            />
          </Form.Item>
        </Flex>
      ) as ReactNode}
    </Form>
  );
};

export default EduForm;
