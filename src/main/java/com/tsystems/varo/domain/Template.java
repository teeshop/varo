package com.tsystems.varo.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Template.
 */
@Entity
@Table(name = "template")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Template implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "caption")
    private String caption;

    @Lob
    @Column(name = "template")
    private byte[] template;

    @Column(name = "template_content_type")
    private String templateContentType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCaption() {
        return caption;
    }

    public Template caption(String caption) {
        this.caption = caption;
        return this;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public byte[] getTemplate() {
        return template;
    }

    public Template template(byte[] template) {
        this.template = template;
        return this;
    }

    public void setTemplate(byte[] template) {
        this.template = template;
    }

    public String getTemplateContentType() {
        return templateContentType;
    }

    public Template templateContentType(String templateContentType) {
        this.templateContentType = templateContentType;
        return this;
    }

    public void setTemplateContentType(String templateContentType) {
        this.templateContentType = templateContentType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Template)) {
            return false;
        }
        return id != null && id.equals(((Template) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Template{" +
            "id=" + getId() +
            ", caption='" + getCaption() + "'" +
            ", template='" + getTemplate() + "'" +
            ", templateContentType='" + getTemplateContentType() + "'" +
            "}";
    }
}
