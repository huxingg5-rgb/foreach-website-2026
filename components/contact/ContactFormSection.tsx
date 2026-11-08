"use client";

import type { ComponentProps } from "react";
import type { ContactPageData } from "@/data/contact-cooperation";
import ContactInquiryForm from "@/components/contact/ContactInquiryForm";

type ContactFormSectionProps = {
  data: ContactPageData;
  presetRequestType?: string;
  id?: string;
  className?: string;
  showHeading?: boolean;
  formProps?: Pick<ComponentProps<typeof ContactInquiryForm>, "initialValues" | "idPrefix" | "variant" | "analyticsSourceSection">;
};

export default function ContactFormSection({
  data,
  presetRequestType,
  id = "form",
  className = "",
  showHeading = true,
  formProps,
}: ContactFormSectionProps) {
  const finalPresetRequestType =
    presetRequestType || data.form.requestTypes[0] || "";

  return (
    <section
      className={`contact-section contact-form-section ${className}`.trim()}
      id={id}
    >
      <div className="contact-section-inner">
        {showHeading ? <div className="contact-section-head">
          <h2 className="contact-section-title">{data.form.title}</h2>
          <p className="contact-section-desc">{data.form.description}</p>
        </div> : null}

        <div className="contact-form-layout">
          <aside className="contact-guide-panel">
            <div className="contact-guide-head">
              <h3>{data.guide.title}</h3>
              <p>{data.guide.description}</p>
            </div>

            <div className="contact-guide-list">
              {data.guide.items.map((item) => (
                <div className="contact-guide-item" key={item.number}>
                  <div className="contact-guide-number">{item.number}</div>

                  <div className="contact-guide-copy">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="contact-guide-note">{data.guide.note}</p>
          </aside>

          <ContactInquiryForm
            data={data}
            presetRequestType={finalPresetRequestType}
            {...formProps}
          />
        </div>
      </div>
    </section>
  );
}
