import AmapBlock from "@/components/contact/AmapBlock";
import type { ContactPageData } from "@/data/contact-cooperation";

type ContactInformationSectionProps = {
  data: ContactPageData;
  id?: string;
};

export default function ContactInformationSection({
  data,
  id = "contact-info",
}: ContactInformationSectionProps) {
  return (
    <section
      className="contact-section contact-info-section shared-contact-information"
      id={id}
    >
      <div className="contact-section-inner">
        <div className="contact-section-head">
          <h2 className="contact-section-title">{data.contactInfo.title}</h2>
          <p className="contact-section-desc">
            {data.contactInfo.description}
          </p>
        </div>

        <div className="contact-info-layout">
          <section className="contact-company-panel">
            <h3>
              {data.contactInfo.companyName}
              <span>{data.contactInfo.companyPosition}</span>
            </h3>

            {data.contactInfo.rows.map((row) => (
              <div className="contact-info-row" key={row.label}>
                <div>{row.label}</div>
                <div>{row.value}</div>
              </div>
            ))}
          </section>

          <AmapBlock
            title={data.contactInfo.map.title}
            address={data.contactInfo.map.address}
            lng={data.contactInfo.map.lng}
            lat={data.contactInfo.map.lat}
            mapUrl={data.contactInfo.map.mapUrl}
            loadingText={data.form.mapTexts.loading}
            errorText={data.form.mapTexts.error}
            openMapText={data.form.mapTexts.openMap}
          />
        </div>
      </div>
    </section>
  );
}
