package com.kyuan.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import com.kyuan.myapp.domain.enumeration.Sex;

/**
 * A Customer.
 */
@Entity
@Table(name = "customer")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "id_card")
    private String idCard;

    @Enumerated(EnumType.STRING)
    @Column(name = "sex")
    private Sex sex;

    @Column(name = "address")
    private String address;

    @Column(name = "nation")
    private String nation;

    @Column(name = "age")
    private Integer age;

    @Lob
    @Column(name = "img")
    private byte[] img;

    @Column(name = "img_content_type")
    private String imgContentType;

    @ManyToOne
    @JsonIgnoreProperties(value = "customers", allowSetters = true)
    private CheckIn checkIn;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Customer name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIdCard() {
        return idCard;
    }

    public Customer idCard(String idCard) {
        this.idCard = idCard;
        return this;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public Sex getSex() {
        return sex;
    }

    public Customer sex(Sex sex) {
        this.sex = sex;
        return this;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public String getAddress() {
        return address;
    }

    public Customer address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getNation() {
        return nation;
    }

    public Customer nation(String nation) {
        this.nation = nation;
        return this;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public Integer getAge() {
        return age;
    }

    public Customer age(Integer age) {
        this.age = age;
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public byte[] getImg() {
        return img;
    }

    public Customer img(byte[] img) {
        this.img = img;
        return this;
    }

    public void setImg(byte[] img) {
        this.img = img;
    }

    public String getImgContentType() {
        return imgContentType;
    }

    public Customer imgContentType(String imgContentType) {
        this.imgContentType = imgContentType;
        return this;
    }

    public void setImgContentType(String imgContentType) {
        this.imgContentType = imgContentType;
    }

    public CheckIn getCheckIn() {
        return checkIn;
    }

    public Customer checkIn(CheckIn checkIn) {
        this.checkIn = checkIn;
        return this;
    }

    public void setCheckIn(CheckIn checkIn) {
        this.checkIn = checkIn;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Customer)) {
            return false;
        }
        return id != null && id.equals(((Customer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", idCard='" + getIdCard() + "'" +
            ", sex='" + getSex() + "'" +
            ", address='" + getAddress() + "'" +
            ", nation='" + getNation() + "'" +
            ", age=" + getAge() +
            ", img='" + getImg() + "'" +
            ", imgContentType='" + getImgContentType() + "'" +
            "}";
    }
}
